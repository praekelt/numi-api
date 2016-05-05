const { post } = require('koa-route');
const { create } = require('src/api').users;


module.exports = [
  post('/users/', ctx => create(ctx.request.body))
];
