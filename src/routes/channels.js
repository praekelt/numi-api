const _ = require('koa-route');
const { channel: schemas } = require('schemas').definitions;
const { channels } = require('src/api');
const { read, update, patch } = require('src/middleware/api/methods');


module.exports = [
  _.get('/channels/', read(channels.getAll)),
  _.get('/channels/:id', read(channels.get)),
  _.put('/channels/:id', update(schemas.channel, channels.update)),
  _.patch('/channels/:id', patch(schemas.channel, channels.patch))
];
