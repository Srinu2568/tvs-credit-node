const csvtojson = require("csvtojson");
const UsedCar = require("../models/UsedCar");
const LabelledUsedCar = require("../models/LabelledUsedCar");
const carModel = require("../models/carModel");
const Location = require("../models/location");
var fs = require("fs");

async function definedSetsBulkInsert() {
  let convertedToJson = await csvtojson().fromFile("./seeds/keys.csv");

  convertedToJson.forEach((el, ind, arr) => {
    el["setId"] = el["field1"];
    el["carModel"] = el["Car"];
    el["location"] = el["Location"];
    el["year"] = el["Year"];
    el["kilometers"] = el["Kilometers_Driven"];
    el["ownerType"] = el["Owner_Type"];
    el["fuelType"] = el["Fuel_Type"];
    el["power"] = el["Power"];
    el["price"] = el["Price"];
    delete el["setId"];
    delete el["Unnamed: 0"];
    delete el["field1"];
    delete el["Car"];
    delete el["Location"];
    delete el["Year"];
    delete el["Kilometers_Driven"];
    delete el["Owner_Type"];
    delete el["Fuel_Type"];
    delete el["Power"];
    delete el["Price"];
  });

  await UsedCar.bulkCreate(convertedToJson).catch((err) =>
    console.log(err.message)
  );

  const records = await UsedCar.findAll();

  console.log(records.length);
}

async function labelledDefinedSetsBulkInsert() {
  let convertedToJson = await csvtojson().fromFile("./seeds/value2.csv");

  convertedToJson.forEach((el, ind, arr) => {
    el["setId"] = el["field1"];
    el["carModel"] = el["Car"];
    el["location"] = el["Location"];
    el["year"] = el["Year"];
    el["kilometers"] = el["Kilometers_Driven"];
    el["ownerType"] = el["Owner_Type"];
    el["fuelType"] = el["Fuel_Type"];
    el["power"] = el["Power"];
    el["price"] = el["Price"];
    delete el["setId"];
    delete el["Unnamed: 0"];
    delete el["field1"];
    delete el["Car"];
    delete el["Location"];
    delete el["Year"];
    delete el["Kilometers_Driven"];
    delete el["Owner_Type"];
    delete el["Fuel_Type"];
    delete el["Power"];
    delete el["Price"];
  });

  await LabelledUsedCar.bulkCreate(convertedToJson).catch((err) =>
    console.log(err.message)
  );

  const records = await LabelledUsedCar.findAll();

  console.log(records.length);
}

async function carModelBulkInsert() {
  let convertedToJsonKeys = await csvtojson().fromFile("./seeds/carkeys.csv");
  let convertedToJsonLabels = await csvtojson().fromFile("./seeds/carvals.csv");

  let finalRows = [];
  convertedToJsonKeys.forEach((el, ind, arr) => {
    // el[el.field1] = el["0"];
    el.setNum = el.field1;
    el.carName = el["0"];
    delete el.field1;
    delete el["0"];
  });

  convertedToJsonLabels.forEach((el, ind, arr) => {
    el.label = el["0"];
    el.setNum = el.field1;
    delete el.field1;
    delete el["0"];
  });

  convertedToJsonKeys.forEach((el, ind, arr) => {
    let indOfCorrespondingEl = convertedToJsonLabels.findIndex((val) => {
      if (val.setNum === el.setNum) {
        return true;
      }
    });
    el.label = convertedToJsonLabels[indOfCorrespondingEl].label;
    finalRows.push(el);
  });

  await carModel.bulkCreate(finalRows).catch((err) => console.log(err.message));

  const records = await carModel.findAll();

  // console.log(records);
}

async function locationBulkInsert() {
  let convertedToJsonKeys = await csvtojson().fromFile("./seeds/lock.csv");
  let convertedToJsonLabels = await csvtojson().fromFile("./seeds/locv.csv");

  let finalRows = [];
  convertedToJsonKeys.forEach((el, ind, arr) => {
    // el[el.field1] = el["0"];
    el.setNum = el.field1;
    el.location = el["0"];
    delete el.field1;
    delete el["0"];
  });

  convertedToJsonLabels.forEach((el, ind, arr) => {
    el.label = el["0"];
    el.setNum = el.field1;
    delete el.field1;
    delete el["0"];
  });

  convertedToJsonKeys.forEach((el, ind, arr) => {
    let indOfCorrespondingEl = convertedToJsonLabels.findIndex((val) => {
      if (val.setNum === el.setNum) {
        return true;
      }
    });
    el.label = convertedToJsonLabels[indOfCorrespondingEl].label;
    finalRows.push(el);
  });

  // fs.writeFileSync("loc.txt", JSON.stringify(finalRows, null, 2));

  await Location.bulkCreate(finalRows).catch((err) => console.log(err.message));

  // const records = await Location.findAll();

  console.log(finalRows);
}

module.exports = {
  definedSetsBulkInsert,
  labelledDefinedSetsBulkInsert,
  carModelBulkInsert,
  locationBulkInsert,
};
