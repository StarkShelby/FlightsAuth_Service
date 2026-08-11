const { Roles } = require("../models");
const { CrudRepo } = require("./crudRepo");
class RoleRepo extends CrudRepo {
  constructor() {
    super(Roles);
  }

  async getRoleByName(name) {
    const role = await Roles.findOne({
      where: {
        name: name,
      },
    });
    return role;
  }
}

module.exports = RoleRepo;
