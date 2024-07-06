const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(error)
    }
    next();
  };
};
module.exports = validateBody