const _ = require('koa-route');
const { user: schemas } = require('schemas').definitions;
const { user } = require('src/api');
const { read, create } = require('src/middleware/api/methods');


module.exports = [
  _.get(
    '/user/permissions/',
    read(user.getPermissions)),
];
