const { ValidationError } = require('@praekelt/json-schema-utils');


class NotImplementedError extends Error {}


module.exports = {
  NotImplementedError,
  ValidationError
};
