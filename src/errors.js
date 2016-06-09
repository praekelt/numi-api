const { ValidationError } = require('@praekelt/json-schema-utils');

const {
  AuthUnauthorizedError,
  AuthForbiddenError,
  AuthNotFoundError,
  AuthResponseError
} = require('src/auth');


class NotImplementedError extends Error {
}


class NotFoundError extends Error {
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
  NotFoundError,
  ValidationError,
  AuthenticationRequiredError,
  AuthorizationError,
  UnsupportedAuthTypeError,
  AuthUnauthorizedError,
  AuthForbiddenError,
  AuthNotFoundError,
  AuthResponseError
};
