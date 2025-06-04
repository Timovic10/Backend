const addusername = (req, res, next) => {
    const {name, phone} = req.body;
    




    if (name && phone) {
        const lastfour = phone.slice(10, 14)
        const username = `${name}${lastfour}`
        req.username = username
        next();
    }
    else{
        return res.status(400).json({message: "Name and/or phone number not specified"})
    }
}

module.exports = addusername;