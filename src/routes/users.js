const o = require('koa-compose');
const route = require('koa-route');
const schemas = require('src/schemas');
const users = require('src/api').users;
const methods = require('src/middleware/api/methods');
const create = methods.create;
const post = route.post;
const next = require('src/middleware/util/next');


module.exports = [
  post('/users/', o([
    create(schemas.definitions.user.new),
    ctx => users.create(ctx.request.body)
  ]))
];
