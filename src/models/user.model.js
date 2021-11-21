const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');


const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    name: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    age: {
      type: Number,
      default: null,
      trim: true,
    },
  },
  {
    //timestamps: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// add plugin that converts mongoose to json
//userSchema.set('toJSON', { getters: true, virtuals: true })
    // add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
