const express = require("express");
const addusername = require("../middleware/addusername");
const { register, login } = require("../controller/user.controller");

const userRouter = express.Router();
userRouter.route("/register").post(addusername, register);
userRouter.route("/login").post(login);

module.exports = { userRouter };
