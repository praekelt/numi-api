const _ = require('koa-route');
const { providers } = require('src/api');
const { list, read } = require('src/middlewares/methods');
const { providers: permissions } = require('src/permissions');
const { provider: serializer } = require('src/serializers');
const contexts = require('src/contexts');


module.exports = [
  _.get('/organizations/:orgId/providers/', list(providers.list, {
    serializer,
    access: {
      permission: permissions.read,
      context: contexts.provider.access
    }
  })),

  _.get('/providers/:id', read(providers.get, {
    serializer,
    access: {
      permission: permissions.read,
      context: contexts.provider.access
    }
  }))
];
