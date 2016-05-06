const _ = require('koa-route');
const { user: schemas } = require('schemas').definitions;
const { password } = require('src/api');
const { create } = require('src/middleware/api/methods');


module.exports = [
  _.post(
    '/password-resets/',
    create(schemas.password_reset, password.reset)),

  _.post(
    '/password-confirmations/',
    create(schemas.password_confirmation, password.confirm))
];
