const utils = require('src/schema-utils');


function setDefaults(schema) {
  return (ctx, next) => {
    ctx.request.body = utils.defaults(schema, ctx.request.body);
    return next();
  };
}


function omitReadOnly(schema) {
  return (ctx, next) => {
    ctx.request.body = utils.omitReadOnly(schema, ctx.request.body);
    return next();
  };
}


function validate(schema) {
  return (ctx, next) => {
    utils.validate(schema, ctx.request.body);
    return next();
  };
}


module.exports = {
  setDefaults,
  omitReadOnly,
  validate
};
