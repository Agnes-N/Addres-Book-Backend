import Joi from '@hapi/joi';

const idSchemas = Joi.object().keys({
  contactId: Joi.number().integer().required(),
});

export default idSchemas;
