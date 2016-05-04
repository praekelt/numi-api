const o = require('koa-compose');
const schema = require('src/middleware/util/schema');
const next = require('src/middleware/util/next');
const validateBody = schema.validateBody;
const setDefaults = schema.setDefaults;


function create(schema) {
  return o([
    validateBody(schema),
    setDefaults(schema)
  ]);
}


function read() {
  return next;
}


function update(schema) {
  return o([
    ignoreReadOnly(schema),
    validateBody(schema),
    setDefaults(schema)
  ]);
}


function patch(schema) {
  return o([
    validateBody(schema),
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
