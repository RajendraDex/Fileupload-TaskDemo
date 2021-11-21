const httpStatus = require('http-status');
const _ = require('lodash');
const { removeToken } = require('./token.service');
const {User,Token,UserTest} = require('../models');
const ApiError = require('../utils/ApiError');



/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUsers = async(userBody) => {

    if (await User.findOne({ email: userBody.email }).collation({ locale: "en" })) {
       throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist');
    }
    const user = await User.create(userBody);
    return user;
};

const createUser = async (userBody)=>{
    if(await UserTest.findOne({email:userBody.email}).collation({locale:'en'})){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist')
    }

    if(await UserTest.findOne({contact:userBody.contact}).collation({locale:'en'})){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Mobileno already exist')
      }
    const user=await UserTest.create(userBody);
    return user;
}
const getUserByEmail=async (email) => {
    const user=UserTest.findOne({email});
    if(!user){
        res.status(400).send('user doesn\'t exist');
    }
    return user
}

const loginUserWithEmailAndPassword = async (email, password) => {
      const user = await getUserByEmail(email);
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Email or Password - Try Again');
      }
      return user;
}


const logouts = async (req,res) => {
  const user=req.user;
  //console.log(user._id);
  await removeToken(user._id);

}

const getAllUsers=async(req,res)=>{
  const users= await User.find();
  if(!users){
    res.status(400).send('Can\'t read users')
  }
  return users
}


module.exports = {
    createUsers,
    createUser,
    loginUserWithEmailAndPassword,
    getUserByEmail,
    logouts,
    getAllUsers

};