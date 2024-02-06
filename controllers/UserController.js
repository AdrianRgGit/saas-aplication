const User = require("../models/User");
const bcrypt = require("bcryptjs");

const UserController = {
  async createUser(req, res) {
    try {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const { password } = req.body;

      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          message:
            "The password must have a minimum of 8 characters, one lowercase, one uppercase and one special character.",
        });
      }

      const hashedPass = await bcrypt.hash(password, 10);
      const user = await User.create({
        ...req.body,
        password: hashedPass,
        admin: false,
      });
      res.status(201).send({ msg: "User successfully created", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error creating user", error });
    }
  },
};

module.exports = UserController;
