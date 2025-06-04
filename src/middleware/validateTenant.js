const validatetenant = (req, res, next) => {
    const {role } = req.body;
    

    if (role === "author") {
        next();
    }
    else{
        return res
        .status(400)
        .json({message: "Only author can perform this operation"})
    }
};

module.exports = validatetenant;