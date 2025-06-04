const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      max: 14,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    activePlan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    role: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "author",
    },
    country: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("user", userSchema);
