const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');


const tokenSchema = mongoose.Schema(
  {
    id: {
      type: String,
      generated: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['refresh', 'resetPassword'],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },    
  },
  {
    //timestamps: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

/**
 * @typedef User
 */
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
