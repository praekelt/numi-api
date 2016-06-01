const { ValidationError } = require('@praekelt/json-schema-utils');


class NotImplementedError extends Error {
}


class AuthenticationRequiredError extends Error {
}


class AuthorizationError extends Error {
}


class UnsupportedAuthTypeError extends Error {
  constructor(type) {
    super();
    this.type = type;
  }
}


module.exports = {
  NotImplementedError,
  ValidationError,
  AuthenticationRequiredError,
  AuthorizationError,
  UnsupportedAuthTypeError
};
