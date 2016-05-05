const schemas = require('schemas');
const parse = require('src/api/parse');
const { NotImplementedError } = require('src/errors');


function create(d) {
  d = parse.create(schemas.definitions.user.new, d);
  throw new NotImplementedError();
}


module.exports = {
  create
};
