const Joi = require('@hapi/joi');
const createUser = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      age: Joi.number().required(),
    }),
  };

const register={
  body:Joi.object().keys({
    username: Joi.string().required(),
    user_type: Joi.string().required(),
    email: Joi.string().required(),
    password:Joi.string().required(),
    contact: Joi.string().required(),
}),
};
const login={
  body:Joi.object().keys({
  email: Joi.string().required(),
  password:Joi.string().required(),
}),
};

module.exports = {
      createUser,
      register,
      login
  }
