const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const config = require('src/config');
const routes = require('src/routes');
const errors = require('src/middlewares/errors');
const setAuth = require('src/middlewares/auth');
const setUser = require('src/middlewares/user');
const auth = require('src/core/auth');
const values = require('lodash/values');
const { authUser } = require('src/auth-utils');


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

if (require.main === module) app.listen(config.port);


module.exports = app;
