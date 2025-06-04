const validatecountry = (req, res, next) => {
    const { country } = req.body;
  
    if (country === "Nigeria") {
      next();
    } else {
      return res
        .status(400)
        .json({ message: "This feature isn't available to your country" });
    }
  };
  
  module.exports = validatecountry