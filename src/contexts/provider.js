const providers = require('src/core/providers');


function access(providerId) {
  return providers.get(providerId)
    .then(({data: {organization_id}}) => ({
      providerId,
      organizationId: organization_id
    }));
}


module.exports = {
  access
};
