const o = require('koa-compose');
const next = require('src/middleware/util/next');
const {
  omitReadOnly,
  setDefaults,
  validate
} = require('src/middleware/util/schema');


function create(schema) {
  return o([
    validate(schema),
    setDefaults(schema)
  ]);
}


function read() {
  return next;
}


function update(schema) {
  return o([
    omitReadOnly(schema),
    validate(schema),
    setDefaults(schema)
  ]);
}


function patch(schema) {
  return o([
    validate(schema),
    setDefaults(schema)
  ]);
}


function remove() {
  return next;
}


module.exports = {
  create,
  read,
  update,
  patch,
  remove
};
