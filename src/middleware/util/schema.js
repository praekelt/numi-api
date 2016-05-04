const schemaDefaults = require('json-schema-defaults');
const next = require('src/middleware/util/next');
const merge = require('lodash/merge');


function setDefaults(schema) {
  return (ctx, next) => {
    ctx.request.body = merge({}, schemaDefaults(schema), ctx.request.body);
    return next();
  };
}


function omitReadOnly(schema) {
  // TODO
  return next;
}


function validate(schema) {
  // TODO
  return next;
}


module.exports = {
  setDefaults,
  omitReadOnly,
  validate
};
