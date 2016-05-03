const Koa = require('koa');
const logger = require('koa-logger');
const config = require('src/config');


const app = new Koa()
  .use(logger())
  .listen(config.port);


module.exports = app;
