const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");
const CustomError = require("../../utils/CustomError.js");
const { encode, decode } = require("node-base64-image");
var base64ToImage = require("base64-to-image");
import rimraf from "rimraf";

const UsedCar = require("../../models/UsedCar");
const LabelledUsedCar = require("../../models/LabelledUsedCar");
const carModel = require("../../models/carModel");
const Location = require("../../models/location");

const { fileUpload, cloudinaryUploads } = require("../../configs/cloudinary");
const fs = require("fs");

let yearLabel = {
  2019: 17,
  2018: 16,
  2017: 15,
  2016: 14,
  2015: 13,
  2014: 12,
  2013: 11,
  2012: 10,
  2011: 9,
  2010: 8,
  2009: 7,
  2008: 6,
  2007: 5,
  2006: 4,
  2005: 3,
  2004: 2,
  2003: 1,
};

let fuel_type = { CNG: 0, Diesel: 1, Petrol: 2 };
let owner_type = { First: 2, Second: 1, Third: 0 };

const postForm = BigPromise(async (req, res, next) => {
  let body = req.body;
  let images = [];
  let year = body.year;
  let ownerType = body.ownerType;
  let fuelType = body.fuelType;
  let imagesArr = [];
  let localImgArr = [];

  body.vehicle_images.forEach(async (el) => {
    let imageInfo = base64ToImage(el, "./uploads/");
    localImgArr.push(`./uploads/${imageInfo.fileName}`);
  });

  // return res.json({
  //   success: false,
  // });

  let urls = [];

  const uploader = async (path) => await cloudinaryUploads(path, "uploads");

  if (
    !body.carModel ||
    !body.location ||
    !body.year ||
    !body.kilometers ||
    !body.ownerType ||
    !body.fuelType ||
    !body.power ||
    !body.price
  ) {
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
  if (
    ownerType === "First" &&
    ownerType === "Second" &&
    ownerType === "Third"
  ) {
    ownerType = "Third";
  }

  if (fuelType === "CNG" && fuelType === "Diesel" && fuelType === "Petrol") {
    return next(
      new CustomError(
        {
          error: [
            {
              insufficientInput:
                "please provide the type of fuel used from the given options.",
            },
          ],
        },
        "insufficientInput"
      )
    );
  }

  // console.log(req.files);

  for (const path of localImgArr) {
    // const { path } = file;

    const newpath = await uploader(path);
    urls.push(newpath);

    await rimraf(path);
  }

  // console.log(urls);

  let usedCarUniqueId = uuidv4();

  let usedCarObj = {
    carModel: body.carModel,
    location: body.location,
    year: body.year,
    kilometers: body.kilometers,
    ownerType: ownerType,
    fuelType: fuelType,
    power: body.power,
    price: body.price,
    images: JSON.stringify(urls),
    ucId: usedCarUniqueId,
  };

  let usedCar = await UsedCar.create(usedCarObj);
  // console.log(usedCarObj);

  let labelledUsedCar = {
    carModel: null,
    location: null,
    year: null,
    kilometers: parseInt(usedCarObj.kilometers),
    ownerType: null,
    fuelType: null,
    power: parseFloat(usedCarObj.power),
    price: usedCarObj.price,
    ucId: usedCarUniqueId,
  };

  let labelledCarModel = await carModel.findOne({
    where: {
      carName: usedCarObj.carModel,
    },
  });

  let labelledLocation = await Location.findOne({
    where: {
      location: usedCarObj.location,
    },
  });

  labelledUsedCar.carModel = parseInt(labelledCarModel.label);
  labelledUsedCar.location = parseInt(labelledLocation.label);

  if (usedCarObj.year > 2019) {
    labelledUsedCar.year = 17;
    // labelledUsedCar
  } else if (usedCarObj.year < 2003) {
    labelledUsedCar.year = 1;
  } else {
    labelledUsedCar.year = yearLabel[parseInt(usedCarObj.year)];
  }

  if (
    usedCarObj.ownerType === "First" ||
    usedCarObj.ownerType === "Second" ||
    usedCarObj.ownerType === "Third"
  ) {
    labelledUsedCar.ownerType = owner_type[usedCarObj.ownerType];
  } else {
    labelledUsedCar.ownerType = 0;
  }

  if (
    usedCarObj.fuelType === "CNG" ||
    usedCarObj.fuelType === "Diesel" ||
    usedCarObj.fuelType === "Petrol"
  ) {
    labelledUsedCar.fuelType = fuel_type[usedCarObj.fuelType];
  }

  let labelledUsedCarRow = await usedCar.createLabelledUsedCar(labelledUsedCar);

  res.status(200).json({
    success: true,
  });
});

module.exports = postForm;
