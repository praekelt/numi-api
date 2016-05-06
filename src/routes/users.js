const _ = require('koa-route');
const { user: schemas } = require('schemas').definitions;
const { users } = require('src/api');
const { create, read, update, patch } = require('src/middleware/api/methods');


module.exports = [
  _.post('/users/', create(schemas.new, users.create)),
  _.get('/users/', read(users.getAll, () => ({
    page: 1,
    per_page: 100
  }))),
  _.get('/users/:id', read(users.get)),
  _.put('/users/:id', update(schemas.user, users.update)),
  _.patch('/users/:id', patch(schemas.user, users.patch))
];
