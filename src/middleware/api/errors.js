const error = require('src/middleware/util/error');
const { str } = require('src/utils');
const {
  NotImplementedError,
  ValidationError,
  AuthorizationError,
  AuthenticationRequiredError,
  UnsupportedAuthTypeError
} = require('src/errors');


function notImplementedError(ctx, e) {
  ctx.status = 501;

  ctx.body = {
    type: 'not_implemented'
  };
}


function validationError(ctx, e) {
  ctx.status = 422;

  ctx.body = {
    type: 'validation_error',
    message: "Invalid request",
    details: {errors: e.errors}
  };
}


function authenticationRequiredError(ctx, e) {
  ctx.status = 401;

  ctx.body = {
    type: 'authentication_required_error',
    message: "Authentication details are required for the given request"
  };
}


function unsupportedAuthTypeError(ctx, e) {
  ctx.status = 401;

  ctx.body = {
    type: 'unsupported_auth_type',
    message: `Authentication type '${e.type}' is not supported`,
    details: {type: e.type}
  };
}


function authorizationError(ctx, e) {
  ctx.status = 403;

  ctx.body = {
    type: 'authorization_error',
    message: str`
      The given authenticated details do not corresond to the required
      permissions for the given request`
  };
}


module.exports = {
  notImplementedError: error(
    NotImplementedError,
    notImplementedError),

  validationError: error(
    ValidationError,
    validationError),

  authorizationError: error(
    AuthorizationError,
    authorizationError),

  authenticationRequiredError: error(
    AuthenticationRequiredError,
    authenticationRequiredError),

  unsupportedAuthTypeError: error(
    UnsupportedAuthTypeError,
    unsupportedAuthTypeError)
};
