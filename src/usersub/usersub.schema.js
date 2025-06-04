const mongoose = require("mongoose");

const userSubSchema = new mongoose.Schema ({
    name: {
        type: String,
    },
    email: {
        type: mongoose.Schema.Types.Mixed,
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    paystack_ref: {
        type: String,
    },
    amountSub: {
        type: Number,
    },
    isSubscribed: {
        type: Boolean,
    },
    planName: {
        type: String,
    },
    timeSubscribed: {
        type: Date, 
    },

});

module.exports = mongoose.model("usersub" , userSubSchema)