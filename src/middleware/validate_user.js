const jwt = require("jsonwebtoken");
const validateUser = (req, res, next) => {
    try {
        //grab the access token 
    const token = req.headers.authorization.replace("Bearer ", "");
    //decode the token to extract user (id)
    const decodedData = jwt.verify(token, process.env.JWTSECRET)
    console.log(decodedData);
    req.userData = decodedData
    next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentication failed, unauthorized token"
        });
    }
};

module.exports = validateUser;