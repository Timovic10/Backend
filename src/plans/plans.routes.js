const express = require("express");
const { getPlans, createPlan, addWebhook } = require("./plans.controller");

const plansRouter = express.Router();

plansRouter.post("/createPlans", createPlan);
plansRouter.get("/getPlans", getPlans);
plansRouter.post("/paystackWebhook", addWebhook)

module.exports = { plansRouter};