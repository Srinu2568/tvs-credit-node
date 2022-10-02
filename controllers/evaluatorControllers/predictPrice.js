const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");
const CustomError = require("../../utils/CustomError.js");
// import fetch from "node-fetch";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const UsedCar = require("../../models/UsedCar");
const LabelledUsedCar = require("../../models/LabelledUsedCar");

const predictPrice = BigPromise(async (req, res, next) => {
  let ucId = req.query.ucId;
  // let authData = req.authData;

  // if (!authData.isAuthenticated || !authData.isEvaluator) {
  //   return next(
  //     new CustomError(
  //       {
  //         error: {
  //           authFailure: "please login before you create your rooms.",
  //         },
  //       },
  //       "authFailure"
  //     )
  //   );
  // }

  console.log(ucId);

  if (!ucId) {
    return next(
      new CustomError(
        {
          error: [
            {
              insufficientInput: "please provide the required fields",
            },
          ],
        },
        "insufficientInput"
      )
    );
  }

  let usedCar = await UsedCar.findOne({
    where: {
      ucId,
    },
  });

  let labelledUsedCar = await LabelledUsedCar.findOne({
    where: {
      ucId,
    },
  });

  const body = {
    Car: labelledUsedCar.carModel,
    Location: labelledUsedCar.location,
    Year: labelledUsedCar.year,
    Kilometers_Driven: labelledUsedCar.kilometers,
    Owner_Type: labelledUsedCar.ownerType,
    Fuel_Type: labelledUsedCar.fuelType,
    Power: labelledUsedCar.power,
  };

  const response = await fetch(
    "https://tvs-price-predictor.herokuapp.com/predict",
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );

  const predictedPrice = await response.json();

  usedCar.predictedPrice = predictedPrice.prediction;

  await usedCar.save();

  // console.log(predictedPrice);

  res.status(200).json({
    success: true,
    predictedPrice: predictedPrice,
  });
});

module.exports = predictPrice;
