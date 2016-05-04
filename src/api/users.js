const { NotImplementedError } = require('src/errors');


function create() {
  throw new NotImplementedError();
}


exports.create = create;
