const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sequelize = require("../configs/db.js");

class CarModel extends Model {}

CarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    carName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    label: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CarModel",
    scopes: {
      withoutId: {
        attributes: { exclude: ["id", "updatedAt", "createdAt", "label"] },
      },
    },
  }
);

module.exports = CarModel;

// use the scope at times where password is not needed when quering about user
// User.scope("withoutPassword").querymethods()
