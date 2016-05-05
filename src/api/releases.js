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


module.exports = {
  create,
  getAll,
  get
};
