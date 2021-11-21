const validate=require('../../middlewares/validate');
const auth=require('../../middlewares/auth');
const userController=require('../../controllers/user.controller');
const userValidation=require('../../validations/user.validation');
const express=require('express');
const router=express.Router();

//router.post('/register', validate(userValidation.register), userController.register);
router
    .route('/register')
    .post(validate(userValidation.register),userController.register);


router
    .route('/login')
    .post(validate(userValidation.login),userController.login);

router
    .route('/logout')
    .post( auth(), userController.logout);

//router.post('/logout',auth('getMember'), userController.logout);

    module.exports = router;