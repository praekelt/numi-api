const Koa = require('koa');
const logger = require('koa-logger');


const app = new Koa()
  .use(logger())
  .listen(2332);


module.exports = app;
