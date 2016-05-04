const o = require('koa-compose');
const { post } = require('koa-route');
const schemas = require('schemas');
const { users } = require('src/api');
const { create } = require('src/middleware/api/methods');


module.exports = [
  post('/users/', o([
    create(schemas.definitions.user.new),
    ctx => users.create(ctx.request.body)
  ]))
];
