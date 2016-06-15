const provider = require('src/contexts/provider');
const channels = require('src/core/channels');


function access(channelId) {
  return channels.get(channelId)
    .then(({data: {provider_id}}) => provider.access(provider_id))
    .then(({providerId, organizationId}) => ({
      channelId,
      providerId,
      organizationId
    }));
}


module.exports = {
  access
};
