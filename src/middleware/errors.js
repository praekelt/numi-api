const trap = require('src/utils').trap;
const errors = require('src/errors');
const NotImplementedError = errors.NotImplementedError;


function notImplemented(ctx, e) {
  ctx.status = 501;

  ctx.body = {
    type: 'not_implemented'
  };
}


function error(type, fn) {
  return (ctx, next) => next()
    .catch(trap(type, e => fn(ctx, e)));
}


module.exports = [
  error(NotImplementedError, notImplemented)
];
