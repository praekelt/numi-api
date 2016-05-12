const _ = require('koa-route');
const { providers } = require('src/api');
const { read } = require('src/middleware/api/methods');


module.exports = [
  _.get('/providers/', read(providers.getAll)),
  _.get('/providers/:id', read(providers.get))
];
