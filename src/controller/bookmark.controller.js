const express = require("express");
const {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} = require("../controller/bookmark.controller");
const validateUser = require("../middleware/validate_user");
const bookmarkRouter = express.Router();

bookmarkRouter
  .post("/bookmarks/:poemId", validateUser, addBookmark)
  .get("/bookmarks", validateUser, getBookmarks)
  .delete("/bookmarks/:id",validateUser, deleteBookmark);

module.exports = { bookmarkRouter };
