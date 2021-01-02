/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const signupSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastname: Joi.string().alphanum().min(3).max(30)
    .required(),
  email: Joi.string().email().max(30).required(),
  password: Joi.string().alphanum().min(6).max(30)
    .required(),
});

export const signinSchema = Joi.object().keys({
  email: Joi.string().email().max(30).required(),
  password: Joi.string().alphanum().min(6).max(30)
    .required()
});
