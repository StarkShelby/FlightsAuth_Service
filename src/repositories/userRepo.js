const { User } = require("../models");
const { CrudRepo } = require("./crudRepo");
class UserRepo extends CrudRepo {
  constructor() {
    super(User);
  }
}

module.exports = UserRepo;
