const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");
const CustomError = require("../../utils/CustomError.js");

const UsedCar = require("../../models/UsedCar");
const LabelledUsedCar = require("../../models/LabelledUsedCar");

const getUCById = BigPromise(async (req, res, next) => {
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
  let ucId = req.query.ucId;
  let usedCar = await UsedCar.findOne({
    where: {
      ucId,
    },
  });
  // console.log(usedCarObj);

  res.status(200).json({
    success: true,
    data: usedCar,
  });
});

module.exports = getUCById;
