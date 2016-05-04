const o = require('koa-compose');
const { validate, setDefaults } = require('src/middleware/util/schema');
const next = require('src/middleware/util/next');


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


exports.create = create;
exports.read = read;
exports.update = update;
exports.patch = patch;
exports.remove = remove;
