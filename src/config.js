const defaults = require('json-schema-defaults');
const schemas = require('src/schemas');
const utils = require('src/utils');
const conj = utils.conj;
const read = utils.read;


// TODO validate config
module.exports = conj(defaults(schemas.definitions.config), readConfig());


function readConfig() {
  return 'CONFIG' in process.env
    ? read(process.env.CONFIG)
    : {};
}
