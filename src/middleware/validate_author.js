const userschema = require("../models/user.schema");

const validateAuthor = async (req, res, next) => {
  try {
    const { userId } = req.userData;
    const poemAuthor = req.params.id;
    console.log("Id for user", userId);
    console.log("id for author", poemAuthor);
    if (userId && poemAuthor) {
      if (userId !== poemAuthor) {
        return res.status(403).json({
          message: "Forbidden request",
        });
      }

      next();
    }
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized user",
    });
  }
};
module.exports = validateAuthor;
