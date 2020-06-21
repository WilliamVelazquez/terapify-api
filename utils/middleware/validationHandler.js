const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) {
  // console.log('data-->', data);
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    // console.log('schema-->', schema);
    const error = validate(req[check], joi.object(schema));

    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
