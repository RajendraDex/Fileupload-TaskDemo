const util = require("util");
const multer = require("multer");
 require('dotenv').config();
 const fileuploadpath = process.env.UPLOAD_FILE;
const maxSize = 20 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, fileuploadpath);
    },
    filename: (req, file, next) => {
        console.log(file.originalname);
        next(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let UploadFile = util.promisify(uploadFile);
module.exports = UploadFile;