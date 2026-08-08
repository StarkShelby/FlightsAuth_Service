const { User } = require("../models");
const { CrudRepo } = require("./crudRepo");
class UserRepo extends CrudRepo {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
}

module.exports = UserRepo;
