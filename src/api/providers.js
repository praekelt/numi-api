const { NotImplementedError } = require('src/errors');


function list() {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


module.exports = {
  list,
  get
};
