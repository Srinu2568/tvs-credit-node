const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sequelize = require("../configs/db.js");

class UsedCar extends Model {}

UsedCar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    carModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kilometers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuelType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    power: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    videos: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    ucId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evaluatedPrice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    predictedPrice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEvalFinished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    evalFeedback: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UsedCar",
  }
);

module.exports = UsedCar;

// use the scope at times where password is not needed when quering about user
// User.scope("withoutPassword").querymethods()

// price col - it is base price of the used car as per the seller
