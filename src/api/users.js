const { NotImplementedError } = require('src/errors');


function create() {
  throw new NotImplementedError();
}


module.exports = {
  create
};
