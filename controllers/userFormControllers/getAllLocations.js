const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");
const CustomError = require("../../utils/CustomError.js");

const Location = require("../../models/location");

const getAllLocations = BigPromise(async (req, res, next) => {
  let allLocations = await Location.scope("withoutId").findAll();

  console.log("running locations");

  res.status(200).json({
    success: true,
    data: allLocations,
  });
});

module.exports = getAllLocations;
