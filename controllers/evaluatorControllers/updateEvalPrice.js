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

const updateEvaluatedPrice = BigPromise(async (req, res, next) => {
  let ucId = req.body.ucId;
  let evaluatedPrice = req.body.evaluatedPrice;
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

  if (!evaluatedPrice || !ucId) {
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

  usedCar.evaluatedPrice = evaluatedPrice;

  await usedCar.save();

  // console.log(predictedPrice);

  res.status(200).json({
    success: true,
  });
});

module.exports = updateEvaluatedPrice;
