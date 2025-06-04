const express = require("express");

const { donationsMade } = require("../controller/donation.controller");
const donationRouter = express.Router();

donationRouter.route("/donate").post(donationsMade);

module.exports = { donationRouter };