const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const {userService} = require('../services');
const {Token} =require('../models');
const ApiError = require('../utils/ApiError');
const message = require('../utils/ResponseMessage');
require('dotenv').config();


// generate token 
const generateToken=async (userId,expires,secret=process.env.JWT_SECRET)=>{
   const payload={
    sub:userId,
    ias:moment().unix(),
    exp:expires.unix(),
    }
    return jwt.sign(payload,secret)
};

// save tokens
const saveToken=async (token,userId,expires,type,blacklisted=false) => {
//   console.log('token',token);
//   console.log('id',userId);
//   console.log('exp',expires);
//   console.log('type',type);
//   console.log('blac',blacklisted)


    const tokenDoc = await Token.create(
        {
        token,
        user:userId,
        expires:expires.toDate(),
        type,
        blacklisted,
    })

    return tokenDoc 
   
};


// varify token
const verifyToken=async (token,type)=>{
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    const tokenDoc= await Token.findOne(token,type,blacklisted=false);
    if(!tokenDoc){
        throw new Error('Token not found')
    }
    return tokenDoc;
 };

// generate authenticate token
const generateAuthTokens=async (user)=>{

    const accessTokenExpire=moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
    const accessToken=await generateToken(user._id,accessTokenExpire);
    const refreshTokenExpires=moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days')
    const refreshToken=await generateToken(user._id,refreshTokenExpires);
    await saveToken(refreshToken,user._id,refreshTokenExpires,'refresh');

    return {
        access:{
            token:accessToken,
            expires:accessTokenExpire.toDate(),
        },
        refresh:{
          refresh: refreshToken,
          expires: refreshTokenExpires.toDate(),
        }
    }

};

// remove token 
const removeToken=async (userId) => {
 const user=userId;
 const token= await Token.findOne({user});
 if(token){
     token.remove()
 }
}


module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    removeToken,
    
  };