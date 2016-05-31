const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const config = require('src/config');
const routes = require('src/routes');
const errors = require('src/middleware/api/errors');
const setAuth = require('src/middleware/api/auth');
const setUser = require('src/middleware/api/user');
const { authUser } = require('src/core/auth-utils');
const auth = require('src/core/auth');
const values = require('lodash/values');


const env = process.env.NODE_ENV || 'dev';
const app = new Koa();

auth.conf.prefix = config.authUrl;

if (env !== 'test') app.use(logger());

values(errors)
  .forEach(error => app.use(error));

app
  .use(bodyParser())
  .use(setAuth())
  .use(setUser(authUser));

routes
  .forEach(route => app.use(route));

app
  .listen(config.port);


module.exports = app;
