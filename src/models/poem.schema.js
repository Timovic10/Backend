 const mongoose  = require("mongoose");
 const Schema = mongoose.Schema;
 
 const poemSchema = new Schema ({
    
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        
        },
        category: {
            type: String,
            enum: ["fiction","romance","adventure","folk tale","government","others"],
            default: "others",
            required: true
        },
        title:{
            type: String,
            required: true,
            maxlength: [40,"Too long poem title"],
            minlength: [2, "Too short title"],
            trim: true

        },
        body:{
            type: String,
            required: true,
            maxlength: [2000,"Body content limit exceeded"],
            minlength: [50, "Too short body content"],
            trim: true
        },
        image: {
            type: String,

        },
        likes: {
            type: Number,
            default:0
        },
        readTime: {
            type: Number,
            default:2
        },
    },
    {timestamps: true, toJSON: { virtuals: true}, to0bject: {virtuals: true}}
    
    );
    poemSchema.virtual("comments", {
        ref: "comment",
        localField: "_id",
        foreignField: "poemId",
    
    });

    poemSchema.pre(["find", "findOne"], function() {
        this.populate({
            path: "comments",
            select: "likes comment -_id"
        });
    });
    
    module.exports = mongoose.model("poem", poemSchema);

