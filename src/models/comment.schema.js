const {types, required} = require ("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  poemId: {
    type: Schema.ObjectId,
    ref: "Poem",
    required: true,  
  },
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies:{
    type: Number,
    default: 0,
    },
  },
 {timestamps: true}
);

commentSchema.pre(["find", "findOne"], function(){
    this.populate("userId", "userName -_id");
});


module.exports = mongoose.model("comment", commentSchema);
