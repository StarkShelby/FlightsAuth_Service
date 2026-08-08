const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");
async function checkPassword(plainPasssword, encrytedPassword) {
  try {
    return bcrypt.compareSync(plainPasssword, encrytedPassword);
  } catch (error) {
    throw error;
  }
}

async function createJWTToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  createJWTToken,
};
