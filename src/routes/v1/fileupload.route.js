const validate=require('../../middlewares/validate')
const fileuploadController =require('../../controllers/fileupload.controller')
const userValidation =require('../../validations/user.validation')
const express = require("express");
const router = express.Router();
router.post("/upload", fileuploadController.uploadfile);
router.get("/files", fileuploadController.getListFiles);
router.get("/files/:name", fileuploadController.download);
router.delete('/delete/:name', fileuploadController.deleteFile);
router
    .route('/add-user/:name')
    .post(fileuploadController.createUser);


router
    .route('/write-csv')
    .post(fileuploadController.createCsvFile);

module.exports = router;