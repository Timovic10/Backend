const Joi = require("joi");

const addPoemComment = Joi.object({
    text: Joi.string().required().trim(),
    poemId: Joi.string().required(),
    userId: Joi.string(),
    likes: Joi.number().default(0),
    replies: Joi.number().default(0),
});

module.exports = { addPoemComment };