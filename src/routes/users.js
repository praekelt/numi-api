const { post } = require('koa-route');
const schemas = require('schemas');
const { users } = require('src/api');
const { create } = require('src/middleware/api/methods');


module.exports = [
  post('/users/', create(schemas.definitions.user.new, users.create))
];
