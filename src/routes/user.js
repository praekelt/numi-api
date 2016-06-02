const _ = require('koa-route');
const { user } = require('src/api');
const { read } = require('src/middlewares/methods');


module.exports = [
  _.get('/user/permissions/', read(user.getPermissions))
];
