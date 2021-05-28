"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const activationToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRECT_KEY, {
    expiresIn: "50m",
  });
};

module.exports = activationToken;
