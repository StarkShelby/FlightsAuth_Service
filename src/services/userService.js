const { UserRepo } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");

const userRepo = new UserRepo();

async function createUser(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    console.log(error.name);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((error) => {
        explanation.push(error.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    // if (!data.pass.len < 6) {
    //   throw new AppError(
    //     "Password must be atleast 6 characters",
    //     StatusCodes.BAD_REQUEST,
    //   );
    // }
    throw new AppError("Cannot create user", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createUser,
};
