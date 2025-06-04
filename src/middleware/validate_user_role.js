const userschema = require("../models/user.schema");

const validateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.userData;
    if (userId) {
      const user = await userschema
        .findOne({ _id: userId })
        .select("-password");
      console.log(user);
      if (!user)
        return res.status(401).json({
          message: "User not found",
        });
      if (user.role === "author" || user.role === "admin") {
        next();
      } else {
        return res.status(403).json({
          message: "Forbidden request",
        });
      }
    }
  } catch (err) {
    return res.status(401).json({
      message: "unauthorized user",
    });
  }
};

module.exports = validateUserRole;
