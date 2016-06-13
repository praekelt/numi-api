const { NotImplementedError } = require('src/errors');


function access(organizationId) {
  return {organizationId};
}


module.exports = {
  access
};
