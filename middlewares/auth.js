const User = require("../models/User");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = getCookie("token");
    const payload = jwt.verify(token, jwt_secret);

    const user = await User.findOne({ _id: payload._id });

    if (!user) {
      return res.status(401).send({ message: "You are not allowed" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send({ error, message: "There was a problem with the token" });
  }
};

module.exports = {
  auth,
};
