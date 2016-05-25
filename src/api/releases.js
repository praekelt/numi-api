const { NotImplementedError } = require('src/errors');


function create(dialogueId, d) {
  throw new NotImplementedError();
}


function getAll(dialogueId, params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  getAll,
  get
};
