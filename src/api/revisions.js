const { NotImplementedError } = require('src/errors');


function create(dialogueId, d) {
  throw new NotImplementedError();
}


function getAll(dialogueId, params) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  getAll
};
