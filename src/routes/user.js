const _ = require('koa-route');
const { user: schemas } = require('schemas').definitions;
const { user } = require('src/api');
const { read, create } = require('src/middleware/api/methods');


module.exports = [
  _.get(
    '/user',
    read(user.get)),

  _.get(
    '/user/password-changes/',
    create(schemas.password_change, user.changePassword))
];
