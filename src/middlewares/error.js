const { trap } = require('src/utils');


function error(type, fn) {
  return (ctx, next) => next()
    .catch(trap(type, e => fn(ctx, e)));
}


module.exports = error;
