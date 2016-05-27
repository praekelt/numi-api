const { NotImplementedError } = require('src/errors');


function create(projectId, d) {
  throw new NotImplementedError();
}


function list(projectId, params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


function getTeams(id) {
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
  getTeams,
  update,
  patch
};
