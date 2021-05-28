"use strict";
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const refreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });
};

module.exports = refreshToken;
