"use strict";
const randomCode = async () => {
  return await crypto.randomInt(0, 1000000, (err, n) => {
    if (err) throw err;
    const verificationCode = n.toString().padStart("0", 6);
  });
};

module.exports = randomCode;
