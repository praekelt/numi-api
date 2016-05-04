const schemaDefaults = require('json-schema-defaults');
const omitBy = require('lodash/omitBy');
const merge = require('lodash/merge');


function defaults(schema, d) {
  return merge({}, schemaDefaults(schema), d);
}


function omitReadOnly(schema, d) {
  // TODO support for values other than single-level object properties
  return omitBy(d, (v, k) => propertyIsReadOnly(schema, k));
}


function propertyIsReadOnly(schema, k) {
  const prop = schema.properties[k];
  return prop && prop.readOnly;
}


module.exports = {
  defaults,
  omitReadOnly
};
