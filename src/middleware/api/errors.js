const { NotImplementedError } = require('src/errors');
const error = require('src/middleware/util/error');


function notImplemented(ctx, e) {
  ctx.status = 501;

  ctx.body = {
    type: 'not_implemented'
  };
}


module.exports = {
  notImplemented: error(NotImplementedError, notImplemented)
};
