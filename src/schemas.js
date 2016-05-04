const resolve = require('path').resolve;
const { read } = require('src/utils');
const schemas = require('schemas');


function readSchema(filename) {
  return read(resolve(__dirname, '..', 'schemas', filename));
}


module.exports = schemas(readSchema);
