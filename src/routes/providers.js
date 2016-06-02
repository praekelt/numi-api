const _ = require('koa-route');
const { providers } = require('src/api');
const { read } = require('src/middlewares/methods');


module.exports = [
  _.get('/providers/', read(providers.list)),
  _.get('/providers/:id', read(providers.get))
];
