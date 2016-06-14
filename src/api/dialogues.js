const { NotImplementedError } = require('src/errors');


function create(projectId, d) {
  throw new NotImplementedError();
}


function list(projectId) {
  throw new NotImplementedError();
}


function get(id) {
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
  listTeams,
  update,
  patch
};
