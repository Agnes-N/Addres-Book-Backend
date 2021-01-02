import Joi from '@hapi/joi';

const contactSchema = Joi.object().keys({
  names: Joi.string().alphanum().min(3).max(60)
    .required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string().email().max(30),
});

export default contactSchema;
