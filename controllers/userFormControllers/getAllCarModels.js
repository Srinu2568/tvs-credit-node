const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");
const CustomError = require("../../utils/CustomError.js");

const CarModel = require("../../models/carModel");

const getAllCarModels = BigPromise(async (req, res, next) => {
  let carModels = await CarModel.scope("withoutId").findAll();

  res.status(200).json({
    success: true,
    data: carModels,
  });
});

module.exports = getAllCarModels;
