const { read } = require('src/utils');
const { resolve } = require('path');


function readConfig(path) {
  return read(resolve(__dirname, path));
}


module.exports = {
  definitions: {
    config: readConfig('./config.yml'),
    user: {
      user: readConfig('./user/user.yml'),
      new: readConfig('./user/new.yml')
    }
  }
};
