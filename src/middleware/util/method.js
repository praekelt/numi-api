const last = require('lodash/last');


function method(opts, fn) {
  return (ctx, ...args) => fn(ctx, args.slice(0, -1), last(args));
}


module.exports = method;
