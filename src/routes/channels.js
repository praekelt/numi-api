const _ = require('koa-route');
const { channel: { channel: schema } } = require('schemas').definitions;
const { channels } = require('src/api');
const { read, update, patch } = require('src/middlewares/methods');


module.exports = [
  _.get('/channels/', read(channels.list)),
  _.get('/channels/:id', read(channels.get)),
  _.put('/channels/:id', update(channels.update, {schema})),
  _.patch('/channels/:id', patch(channels.patch))
];
