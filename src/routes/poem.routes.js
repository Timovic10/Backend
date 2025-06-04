const express = require("express")
const{ 
    getPoems,
    createPoem,
    getPoem,
    updatePoem,
} = require ("../controller/poems.controller")


const validatetenant = require("../middleware/validateTenant");
const validateUser = require("../middleware/validate_user");
const validateUserRole = require("../middleware/validate_user_role");
const validateAuthor = require("../middleware/validate_author");
const { uploadSingleImg } = require("../../multer/multer");
const { validate } = require("../joi/validate");
const { addpoemvalidation } = require("../joi/poem.validation");
const { addPoemComment } = require("../joi/comment.validate");
const { userRegistrationValidation } = require("../joi/register.validate");


const poemRouter = express.Router();
poemRouter
    .route("/poem")
    .get(validateUser, getPoems)
    .post(validateUser, validateUserRole, uploadSingleImg, validate(addpoemvalidation), createPoem);

poemRouter.route("/singlePoem").get(validateUser, getPoem);
poemRouter
    .route("/singlePoem/:id")
    .patch(validateUser, validateAuthor, updatePoem);


module.exports = {poemRouter};