const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sequelize = require("../configs/db.js");

class LabelledUsedCar extends Model {}

LabelledUsedCar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    carModel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kilometers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fuelType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    power: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ucId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usedCarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LabelledUsedCar",
  }
);

module.exports = LabelledUsedCar;

// use the scope at times where password is not needed when quering about user
// User.scope("withoutPassword").querymethods()

/*
usedCarId - foreign key id col

ucId - unique id col that is the id of the used car.


*/
