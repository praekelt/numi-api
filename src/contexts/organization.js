const { NotImplementedError } = require('src/errors');


function access(organisationId) {
  return {organisationId};
}


module.exports = {
  access
};
