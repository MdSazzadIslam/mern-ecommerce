"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const generateToken = async (id) =>
  await jwt.sign({ id }, process.env.JWT_SECRECT_KEY, { expiresIn: "1day" });

module.exports = generateToken;
