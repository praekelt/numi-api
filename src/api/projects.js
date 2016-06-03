const { NotImplementedError } = require('src/errors');


function create(d) {
  throw new NotImplementedError();
}


function list(params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


function listChannels(id) {
  throw new NotImplementedError();
}


function listTeams(id) {
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
  list,
  get,
  listChannels,
  listTeams,
  update,
  patch
};
