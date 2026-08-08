const { UserRepo } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");
const { Auth } = require("../utils/common");

const userRepo = new UserRepo();

async function createUser(data) {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      throw error;
    }

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

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found for the given email ",
        StatusCodes.NOT_FOUND,
      );
    }
    const passwordMatched = await Auth.checkPassword(
      data.password,
      user.password,
    );
    console.log("password matched", passwordMatched);
    if (!passwordMatched) {
      throw new AppError("Invalid Password ", StatusCodes.BAD_REQUEST);
    }

    const jwt = await Auth.createJWTToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    console.log(error);
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
    // Already an AppError? Don't modify it.
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.explanation, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createUser,
  signin,
};
