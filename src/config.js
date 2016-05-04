const defaults = require('json-schema-defaults');
const schemas = require('src/schemas');
const { conj, read } = require('src/utils');

function readConfig() {
  return 'CONFIG' in process.env
    ? read(process.env.CONFIG)
    : {};
}

// TODO validate config
module.exports = conj(defaults(schemas.definitions.config), readConfig());
