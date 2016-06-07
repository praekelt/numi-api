const _ = require('koa-route');
const { permission: { permission: schema } } = require('schemas').definitions;
const { permissions } = require('src/api');
const { create, read, remove } = require('src/middlewares/methods');
const { permissions } = require('src/permissions');
const contexts = require('src/contexts');


module.exports = [
  _.post('/teams/:team_id/permissions/', create(permissions.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.permission.access
    }
  })),

  _.get('/teams/:team_id/permissions/', read(permissions.list)),

  _.get('/teams/:team_id/permissions/:id', read(permissions.get)),

  _.delete('/teams/:team_id/permissions/:id', remove(permissions.remove, {
    access: {
      permission: permissions.remove,
      context: contexts.permission.access
    }
  }))
];
