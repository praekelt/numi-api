const schemaDefaults = require('json-schema-defaults');
const keys = require('lodash/keys');
const filter = require('lodash/filter');
const omitBy = require('lodash/omitBy');
const merge = require('lodash/merge');
const decamelize = require('decamelize');
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
  const errors = []
    .concat(validationErrors(schema, d))
    .concat(readOnlyErrors(schema, d));

  if (errors.length) throw new ValidationError(errors);
}


function validationErrors(schema, d) {
  const validator = new Validator({
    allErrors: true,
    jsonPointers: true
  });

  validator.validate(schema, d);
  return (validator.errors || []).map(parseValidationError);
}


function readOnlyErrors(schema, d) {
  // TODO support for values other than single-level object properties
  return filter(keys(d), k => propertyIsReadOnly(schema, k))
  .map(k => parseReadOnlyError({
    name: k,
    path: `/${k}`
  }));
}


function parseReadOnlyError({name, path}) {
  return {
    type: 'read_only',
    path,
    message: `read only property '${name}' given`,
    details: {},
    schema_path: null
  };
}


function parseValidationError(e) {
  return {
    type: decamelize(e.keyword, '_'),
    path: e.dataPath,
    message: e.message,
    details: e.params,
    schema_path: e.schemaPath
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
