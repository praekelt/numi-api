const schemaDefaults = require('json-schema-defaults');
const omitBy = require('lodash/omitBy');
const merge = require('lodash/merge');
const Validator = require('ajv');
const { ValidationError } = require('src/errors');


function defaults(schema, d) {
  return merge({}, schemaDefaults(schema), d);
}


function omitReadOnly(schema, d) {
  // TODO support for values other than single-level object properties
  return omitBy(d, (v, k) => propertyIsReadOnly(schema, k));
}


function validate(schema, d) {
  const validator = new Validator({
    allErrors: true,
    jsonPointers: true
  });

  validator.validate(schema, d);

  const errors = (validator.errors || []).map(parseValidationError);
  if (errors.length) throw new ValidationError(errors);
}


function parseValidationError(e) {
  return {
    type: e.keyword,
    path: e.dataPath,
    message: e.message,
    details: e.params,
    schemaPath: e.schemaPath
  };
}


function propertyIsReadOnly(schema, k) {
  const prop = schema.properties[k];
  return prop && prop.readOnly;
}


module.exports = {
  defaults,
  omitReadOnly,
  validate
};
