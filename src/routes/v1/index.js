const express = require('express');
const fileuploadRoute = require('./fileupload.route');
const userRoute= require('./user.route');

const router = express.Router();
router.use('/file', fileuploadRoute);
router.use('/user', userRoute);



module.exports = router;