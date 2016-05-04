const error = require('src/middleware/util/error');
const {
  NotImplementedError,
  ValidationError
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


module.exports = {
  notImplementedError: error(NotImplementedError, notImplementedError),
  validationError: error(ValidationError, validationError)
};
