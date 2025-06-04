const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    poemId: { type: Schema.Types.ObjectId, required: true, ref: "Poem" },
    // createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
