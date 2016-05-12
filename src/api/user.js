const { NotImplementedError } = require('src/errors');


function get() {
  throw new NotImplementedError();
}


function changePassword(d) {
  throw new NotImplementedError();
}


module.exports = {
  get,
  changePassword
};
