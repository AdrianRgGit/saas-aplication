const express = require("express");
const UserController = require("../controllers/UserController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);

router.delete("/logout", auth, UserController.logout);

module.exports = router;
