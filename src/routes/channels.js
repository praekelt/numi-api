const _ = require('koa-route');
const { channel: { channel: schema } } = require('schemas').definitions;
const { channels } = require('src/api');
const { read, update, patch } = require('src/middlewares/methods');
const { channel: permissions } = require('src/permissions');
const contexts = require('src/contexts');


module.exports = [
  _.get('/organizations/:orgId/channels/', read(channels.list, {
    access: {
      permission: permissions.read,
      context: contexts.channel.access
    }
  })),

  _.get('/channels/:id', read(channels.get, {
    access: {
      permission: permissions.read,
      context: contexts.channel.access
    }
  })),

  _.put('/channels/:id', update(channels.update, {
    schema,
    access: {
      permission: permissions.write,
      context: contexts.channel.access
    }
  })),

  _.patch('/channels/:id', patch(channels.patch, {
    access: {
      permission: permissions.write,
      context: contexts.channel.access
    }
  }))
];
