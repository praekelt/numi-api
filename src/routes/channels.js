const _ = require('koa-route');
const { channel: { channel: schema } } = require('schemas').definitions;
const { channels } = require('src/api');
const { list, read, update, patch } = require('src/middlewares/methods');
const { channels: permissions } = require('src/permissions');
const { channel: serializer } = require('src/serializers');
const contexts = require('src/contexts');


module.exports = [
  _.get('/organizations/:orgId/channels/', list(channels.list, {
    serializer,
    access: {
      permission: permissions.read,
      context: contexts.channel.access
    }
  })),

  _.get('/channels/:id', read(channels.get, {
    serializer,
    access: {
      permission: permissions.read,
      context: contexts.channel.access
    }
  })),

  _.put('/channels/:id', update(channels.update, {
    schema,
    serializer,
    access: {
      permission: permissions.write,
      context: contexts.channel.access
    }
  })),

  _.patch('/channels/:id', patch(channels.patch, {
    serializer,
    access: {
      permission: permissions.write,
      context: contexts.channel.access
    }
  }))
];
