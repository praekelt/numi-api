const { trap } = require('src/utils');


function error(types, fn) {
  return (ctx, next) => next()
    .catch(trap(types, e => fn(ctx, e)));
}


module.exports = error;
