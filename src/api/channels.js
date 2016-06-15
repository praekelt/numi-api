const { NotImplementedError } = require('src/errors');


function list() {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


function update(id, d) {
  throw new NotImplementedError();
}


function patch(id, d) {
  throw new NotImplementedError();
}


module.exports = {
  list,
  get,
  update,
  patch
};
