const mongoose = require("mongoose");

require("dotenv").config();
const dbstring = process.env.DBSTRING;

const connectDB = async () => {
    try {
        console.log("connecting to database...");
        await mongoose.connect(dbstring, {});
        console.log("connection to database established");
    } catch (err) {
        console.error("Error connecting to db:",err);
    }
};

module.exports = connectDB;