const schemaDefaults = require('json-schema-defaults');
const next = require('src/middleware/util/next');
const { conj } = require('src/utils');


function setDefaults(schema) {
  return (ctx, next) => {
    ctx.request.body = conj(schemaDefaults(schema), ctx.request.body);
    return next();
  };
}


function ignoreReadOnly(schema) {
  // TODO
  return next;
}


function validate(schema) {
  // TODO
  return next;
}


module.exports = {
  setDefaults,
  ignoreReadOnly,
  validate
};
