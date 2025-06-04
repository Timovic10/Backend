const express = require("express")
const validateUser = require("../middleware/validate_user");
const { addComment } = require("../controller/comment.controller");

const commentRouter = express.Router();
commentRouter
    .route("/comment/:poemId")
   // .get(validateUser, getPoems)
    .post(validateUser, addComment);

//poemRouter.route("/singlePoem").get(validateUser, getPoem);
//poemRouter
   // .route("/singlePoem/:id")
   // .patch(validateUser, validateAuthor, updatePoem);


module.exports = {commentRouter};