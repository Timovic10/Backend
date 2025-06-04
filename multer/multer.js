const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require ("path");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>cb(null, "uploads/poems"),
    filename: (req,file,cb)=> {
        const uniqueSuffix = uuidv4();
        const ext = path.extname(file.originalname);
        cb(null, `${file.filename}-${uniqueSuffix}${ext}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        const allowedTypes = ["images/jpeg", "image/jpg", "image/png", "image/gif"];
        if(!allowedTypes.includes(file.mimetype)){
            return cb(new Error("Image type not allowed"), false);
        }
        cb(null, true);

    },
});

const uploadSingleImg = upload.single("imageCover");
const uploadMultipleImg = upload.array("images", 10);

module.exports = {uploadSingleImg, uploadMultipleImg};