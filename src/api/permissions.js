const { NotImplementedError } = require('src/errors');


function create(teamId, d) {
  throw new NotImplementedError();
}


function list(teamId, params) {
  throw new NotImplementedError();
}


function get(teamId, id) {
  throw new NotImplementedError();
}


function remove(teamId, id) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  list,
  get,
  remove
};
