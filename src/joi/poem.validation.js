const Joi = require("joi");

const addPoemValidation = Joi.object({
    title: Joi.string().required().trim().min(2).max(40),
    body: Joi.string().max(2000).min(50).required().trim(),
    category: Joi.string().required(),
    image: Joi.string(),
    likes: Joi.number().default(0),
    
});

module.exports = { addPoemValidation };