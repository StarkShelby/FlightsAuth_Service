"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Roles, { through: "User_Role", as: "role" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 15],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  User.beforeCreate(function encrypt(user) {
    console.log("User before encryption", user);
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
    console.log("User after encryption", user);
  });
  return User;
};
