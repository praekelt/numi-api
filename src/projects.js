const { NotImplementedError } = require('src/errors');


function get() {
  throw new NotImplementedError();
}


module.exports = {
  get
};
