const { NotImplementedError } = require('src/errors');


function create(dialogueId, d) {
  throw new NotImplementedError();
}


function list(dialogueId, params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  list,
  get
};
