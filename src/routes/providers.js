const _ = require('koa-route');
const { providers } = require('src/api');
const { list, read } = require('src/middlewares/methods');
const { providers: permissions } = require('src/permissions');
const contexts = require('src/contexts');


module.exports = [
  _.get('/organizations/:orgId/providers/', list(providers.list, {
    access: {
      permission: permissions.read,
      context: contexts.provider.access
    }
  })),

  _.get('/providers/:id', read(providers.get, {
    access: {
      permission: permissions.read,
      context: contexts.provider.access
    }
  }))
];
