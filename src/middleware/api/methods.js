const o = require('koa-compose');
const next = require('src/middleware/util/next');
const {
  ignoreReadOnly,
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
    ignoreReadOnly(schema),
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
