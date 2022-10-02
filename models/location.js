const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sequelize = require("../configs/db.js");

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    location: {
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
    modelName: "Location",
    scopes: {
      withoutId: {
        attributes: { exclude: ["id", "updatedAt", "createdAt", "label"] },
      },
    },
  }
);

module.exports = Location;

// use the scope at times where password is not needed when quering about user
// User.scope("withoutPassword").querymethods()
