const User = require("../models/User");

const UserController = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({ msg: "User successfully created", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error creating user", error });
    }
  },
};

module.exports = UserController;
