const { BigPromise } = require("../../utils/BigPromise");
const { db } = require("../../configs/db");
const User = require("../../models/User");

const getAllUsers = BigPromise(async (req, res, next) => {
  return res.json(await User.findAll());
});

module.exports = getAllUsers;
