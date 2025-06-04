const Joi = require("joi");

const userRegistrationValidation = Joi.object({
    name: Joi.string().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().trim().required().max(14),
  password: Joi.string().required(),
  country: Joi.string(),
  role: Joi.string()
});

//login validation


const userLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()

});

module.exports = { userRegistrationValidation, userLoginValidation};