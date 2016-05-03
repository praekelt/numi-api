const NotImplementedError = require('src/errors').NotImplementedError;


function create() {
  throw new NotImplementedError();
}


exports.create = create;
