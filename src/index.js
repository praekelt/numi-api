const Koa = require('koa');
const logger = require('koa-logger');
const config = require('src/config');
const routes = require('src/routes');
const errors = require('src/middleware/api/errors');
const values = require('lodash/values');


const env = process.env.NODE_ENV || 'dev';
const app = new Koa();

if (env !== 'test') app.use(logger());

values(errors)
  .forEach(error => app.use(error));

routes
  .forEach(route => app.use(route));

app
  .listen(config.port);


module.exports = app;
