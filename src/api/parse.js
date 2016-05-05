const o = require('lodash/flow');
const identity = require('lodash/identity');

const {
  omitReadOnly,
  setDefaults,
  validate
} = require('src/schema-utils');


const create = o([
  validate,
  setDefaults
]);

const read = identity;

const update = o([
  omitReadOnly,
  validate,
  setDefaults
]);

const patch = o([
  validate,
  setDefaults
]);

const remove = identity;


module.exports = {
  create,
  read,
  update,
  patch,
  remove
};
