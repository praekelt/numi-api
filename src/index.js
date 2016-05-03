const Koa = require('koa');
const logger = require('koa-logger');
const config = require('src/config');
const routes = require('src/routes');
const errors = require('src/middleware/errors');


const app = new Koa()
  .use(logger());

errors
  .forEach(error => app.use(error));

routes
  .forEach(route => app.use(route));

app
  .listen(config.port);


module.exports = app;
