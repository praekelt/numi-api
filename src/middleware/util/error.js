const trap = require('src/utils').trap;


function error(type, fn) {
  return (ctx, next) => next()
    .catch(trap(type, e => fn(ctx, e)));
}


module.exports = error;
