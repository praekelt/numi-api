const rearg = require('lodash/rearg');
const { str } = require('src/utils');
const error = rearg(require('src/middlewares/error'), [1, 0]);

const {
  NotImplementedError,
  ValidationError,
  NotFoundError,
  AuthorizationError,
  AuthenticationRequiredError,
  UnsupportedAuthTypeError,
  AuthUnauthorizedError,
  AuthForbiddenError,
  AuthNotFoundError
} = require('src/errors');


function notImplementedError(ctx, e) {
  ctx.status = 501;

  ctx.body = {
    type: 'not_implemented',
    message: "Not implemented"
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


function notFoundError(ctx, e) {
  ctx.status = 404;

  ctx.body = {
    type: 'not_found',
    message: "Resource not found"
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
  notImplementedError: error(notImplementedError, [
    NotImplementedError
  ]),

  notFoundError: error(notFoundError, [
    NotFoundError,
    AuthNotFoundError
  ]),

  validationError: error(validationError, [
    ValidationError
  ]),

  authorizationError: error(authorizationError, [
    AuthorizationError,
    AuthForbiddenError
  ]),

  authenticationRequiredError: error(authenticationRequiredError, [
    AuthenticationRequiredError,
    AuthUnauthorizedError
  ]),

  unsupportedAuthTypeError: error(unsupportedAuthTypeError, [
    UnsupportedAuthTypeError
  ])
};
