
const catchAsync =require('../utils/catchAsync');
const {UserTest} = require('../models');
const {userService,tokenService} = require('../services');
//const { login } = require('../validations/user.validation');

const register=catchAsync(async (req,res) => {

    const email=req.body.email
    const user=await UserTest.findOne({email});
    if(user){
        if(user.email){
            res.status(200).send('email already exist');
        }
        if(user.contact){
            res.status(200).send('mobileno already exist');
        }
        
    };
    const userData={
        username:req.body.username,
        user_type:req.body.user_type,
        email:req.body.email,
        password:req.body.password,
        contact:req.body.contact,
    }
    const result=await userService.createUser(userData);
    res.status(200).send('user registration successfully');
})


const login=catchAsync( async (req,res) => {
    const email=req.body.email;
    const password=req.body.password;
    const user=await userService.loginUserWithEmailAndPassword(email,password)
    if(!user){
        res.status(400).send('user not found')
    }
    const result=await tokenService.generateAuthTokens(user);
    res.status(200).send(result)//.send('user login successfully')
    
})



const logout=catchAsync(async (req,res) => {
    await userService.logouts(req);
    res.status(200).send('user logout successfully')
    
})


module.exports ={
    register,
    login,
    logout
}