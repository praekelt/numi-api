const { ValidationError } = require('@praekelt/json-schema-utils');


class NotImplementedError extends Error {}
class AuthenticationRequiredError extends Error {}
class AuthorizationError extends Error {}


module.exports = {
  NotImplementedError,
  ValidationError,
  AuthenticationRequiredError,
  AuthorizationError
};
