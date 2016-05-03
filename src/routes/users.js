const route = require('koa-route');
const post = route.post;
const users = require('src/api').users;


module.exports = [
  post('/users/', (ctx) => {
    return users.create(ctx.request.body);
  })
];
