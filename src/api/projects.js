const { NotImplementedError } = require('src/errors');


function create(d) {
  throw new NotImplementedError();
}


function getAll(params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


function getChannels(id) {
  throw new NotImplementedError();
}


function update(id, d) {
  throw new NotImplementedError();
}


function patch(id, d) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  getAll,
  get,
  getChannels,
  update,
  patch
};
