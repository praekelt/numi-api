const { read } = require('src/utils');
const { resolve } = require('path');
const deref = require('json-schema-deref-sync');
const jsonPatch = require('./json-patch');


function readConfig(path) {
  return read(resolve(__dirname, path));
}


module.exports = deref({
  definitions: {
    json_patch: jsonPatch,
    config: readConfig('./config.yml'),
    user: {
      user: readConfig('./user/user.yml'),
      new: readConfig('./user/new.yml')
    }
  }
});
