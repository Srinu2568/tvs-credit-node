const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");
const CustomError = require("../../utils/CustomError.js");

const UsedCar = require("../../models/UsedCar");
const LabelledUsedCar = require("../../models/LabelledUsedCar");

const deleteAUC = BigPromise(async (req, res, next) => {
  let usedCars = await UsedCar.destroy({ truncate: { cascade: true } }).catch(
    (err) => console.log(err)
  );

  let getAllUsedCars = await UsedCar.findAll().catch((err) => console.log(err));

  res.status(200).json({
    success: getAllUsedCars,
  });
});

module.exports = deleteAUC;
