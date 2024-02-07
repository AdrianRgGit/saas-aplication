const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

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

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res.status(400).send({ message: "Incorrect email or password" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Incorrect email or password" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      await user.save(); // NOTE: Esto lo que hace es esperar a que se guarde el objeto user antes de continuar con el código.
      await Token.create({
        login_token: token,
        user_id: user._id,
      });

      res.send({
        message: "Welcome " + user.username,
        token,
        user: user,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with server", error });
    }
  },

  async logout(req, res) {
    try {
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with server", error });
    }
  },
};

module.exports = UserController;
