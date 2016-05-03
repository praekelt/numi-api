const resolve = require('path').resolve;
const read = require('src/utils').read;
const schemas = require('schemas');


module.exports = schemas(readSchema);


function readSchema(filename) {
  return read(resolve(__dirname, '..', 'schemas', filename));
}
