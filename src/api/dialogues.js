const { NotImplementedError } = require('src/errors');


function create(projectId, d) {
  throw new NotImplementedError();
}


function getAll(projectId, params) {
  throw new NotImplementedError();
}


function get(projectId, id) {
  throw new NotImplementedError();
}


function update(projectId, id, d) {
  throw new NotImplementedError();
}


function patch(projectId, id, d) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  getAll,
  get,
  update,
  patch
};
