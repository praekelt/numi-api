const { NotImplementedError } = require('src/errors');


function create(projectId, dialogueId, d) {
  throw new NotImplementedError();
}


function getAll(projectId, dialogueId, params) {
  throw new NotImplementedError();
}


function get(projectId, dialogueId, id) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  getAll,
  get
};
