const { NotImplementedError } = require('src/errors');


function list(params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


module.exports = {
  list,
  get
};
