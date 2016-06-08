const { NotImplementedError } = require('src/errors');


function createAccess() {
  throw new NotImplementedError();
}


function removeAccess() {
  throw new NotImplementedError();
}


module.exports = {
  createAccess,
  removeAccess
};
