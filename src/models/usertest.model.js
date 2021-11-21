const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const usertestSchema=mongoose.Schema({
    id:{
        type: String,
        genereted: true,
        trime:true,

    },
    username:{
        type:String,
        default: null,
        trime:true,
        required:true,
    },
    user_type: {
        type: String,
        default: 3,
        trim: true,
      },
    email:{
        type:String,
        default: null,
        trime:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        },
        required:true
    },
    password:{
        type:String,
        trime:true,
        required:true,
        minlength:8,
        // validate(value){
        //     if(!value.match(/\d/)||!value.match(/[a-z][A-Z]/)){
        //         throw new Error('Password must contain at least one letter and one number')
        //     }
        // },
        //private:true,

    },
    contact:{
        type:String,
        default: null,
        trime:true,
        required:true,
    }
},
{
    timestamps:true
});

// // add plugin that converts mongoose to json
// usertestSchema.set('toJSON', { getters: true, virtuals: true })
//     // add plugin that converts mongoose to json
// usertestSchema.plugin(toJSON);
// usertestSchema.plugin(paginate);


// usertestSchema.methods.isPasswordMatch=async (password)=>{
//     const user=this;
//     return bcrypt.compare(password,user.password);
// }


usertestSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };

// usertestSchema.pre('save', async (next)=>{
//     const user=this;
//     if(user.isModified('password')) {
//         user.password=await bcrypt.hash(user.password,8);
//     }
//     next();
// })

usertestSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });



const UserTest = mongoose.model('UserTest', usertestSchema);

module.exports =UserTest;