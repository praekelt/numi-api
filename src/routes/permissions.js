const _ = require('koa-route');
const { permission: { permission: schema } } = require('schemas').definitions;
const { permissions } = require('src/api');
const { create, remove } = require('src/middlewares/methods');


module.exports = [
  _.post('/teams/:team_id/permissions/', create(permissions.create, {schema})),
  _.delete('/teams/:team_id/permissions/:id', remove(permissions.remove))
];
