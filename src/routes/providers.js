const _ = require('koa-route');
const { providers } = require('src/api');
const { read } = require('src/middleware/api/methods');


module.exports = [
  _.get('/providers/', read(providers.list)),
  _.get('/providers/:id', read(providers.get))
];
