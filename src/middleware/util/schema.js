const schemaDefaults = require('json-schema-defaults');
const next = require('src/middleware/util/next');
const merge = require('lodash/merge');
const omitBy = require('lodash/omitBy');


function setDefaults(schema) {
  return (ctx, next) => {
    ctx.request.body = merge({}, schemaDefaults(schema), ctx.request.body);
    return next();
  };
}


function omitReadOnly(schema) {
  return (ctx, next) => {
    ctx.request.body = omitReadOnlyProps(schema, ctx.request.body);
    return next();
  };
}


function validate(schema) {
  // TODO
  return next;
}


function omitReadOnlyProps(schema, d) {
  // TODO support for values other than single-level object properties
  return omitBy(d, (v, k) => propertyIsReadOnly(schema, k));
}


function propertyIsReadOnly(schema, k) {
  const prop = schema.properties[k];
  return prop && prop.readOnly;
}


module.exports = {
  setDefaults,
  omitReadOnly,
  validate
};
