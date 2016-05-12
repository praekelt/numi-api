const { NotImplementedError } = require('src/errors');


function create(userId, d) {
  throw new NotImplementedError();
}


function getAll(userId, params) {
  throw new NotImplementedError();
}


function get(userId, id) {
  throw new NotImplementedError();
}


function remove(userId, id) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  getAll,
  get,
  remove
};
