//multer 
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("../database/dbConnection");
require("dotenv").config();

const app = express();
//define schema 
const {Schema} = mongoose;
const testpoemSchema = new Schema({
    name: {type: String, required: true},
    description:{type: String, required: true},
    images:{
        type:[String],
        validate: {
            validator: function (value){
                return value.length>=1;
            },
            message: "A poem must have  at least 1 image"
        }
    }
})
const testpoem = mongoose.model("TestPoem", testpoemSchema);

//Muller = storage + upload

const storage = multer.diskStorage({
    destination:(req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) =>{
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file,cb) =>{
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if(!allowedTypes.includes(file.mimetype)){
            return cb(new Error("Image type not allowed"), false);
        }

        cb(null, true);
    },
});
const uploasMultipleImg = upload.array("image", 10);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/createtestpoem", uploasMultipleImg, async(req,res) =>{
    try {
        const {name,description} = req.body;
        if(!req.files || req.files.length<1){
            return res.status(400).json({
                message: "A poem must have at least 1 image",
            })
        }
        const imageFilenames = req.files.map((file)=>file.filename);
        console.log(imageFilenames)

        const newPoem = new testpoem({
            name: name,
            description: description,
            images: imageFilenames,

    });

       const savedPoem = await newPoem.save();
       res
       .status(201).json({message: "Product created successfully", data: newPoem});
        
         } catch(err){
         res.status(500).json({message: "Error creating image", error: err.message});
         }
});


//connectDB();
 app.listen(9001, ()  =>{
    console.log('server is running at port 9001');
 });