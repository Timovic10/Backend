const express = require("express");
const { spellCheck } = require("../controller/spell.controller");

const spellRouter = express.Router();
spellRouter.route("/check").post(spellCheck); // controller || middleware || && (i.e both)

module.exports = { spellRouter };