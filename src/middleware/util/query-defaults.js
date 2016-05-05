const setDefaults = require('lodash/defaults');


function queryDefaults(defaults) {
  return (ctx, next) => {
    ctx.request.query = setDefaults(ctx.request.query, defaults());
    return next();
  };
}


module.exports = queryDefaults;
