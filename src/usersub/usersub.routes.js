const express = require("express");
const {
    createSubscriber,
    getSubscriber,
    initializePayment,
    verifyPayment,
} = require('./usersub.controller');
const validateUser = require("../middleware/validate_user");

   const usersubRouter = express.Router();


   usersubRouter.get("/getSubscriber", validateUser, getSubscriber);
   usersubRouter.post("/createSubscriber", validateUser, createSubscriber);
   usersubRouter.post("/initializePayment", validateUser, initializePayment);
   usersubRouter.post("/verifyPayment", validateUser, verifyPayment);

   module.exports = {
    usersubRouter,
   };
