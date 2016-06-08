const { NotImplementedError } = require('src/errors');


function access() {
  throw new NotImplementedError();
}


module.exports = {
  access
};
