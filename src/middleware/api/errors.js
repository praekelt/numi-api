const errors = require('src/errors');
const error = require('src/middleware/util/error');
const NotImplementedError = errors.NotImplementedError;


function notImplemented(ctx, e) {
  ctx.status = 501;

  ctx.body = {
    type: 'not_implemented'
  };
}


exports.notImplemented = error(NotImplementedError, notImplemented);
