const Joi = require("joi");

const addSchemaJoiApparts = Joi.object({
    location: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    hasBalcony: Joi.boolean().required()
  });

  module.exports = addSchemaJoiApparts