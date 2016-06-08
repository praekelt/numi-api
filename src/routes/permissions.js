const _ = require('koa-route');
const { permission: { permission: schema } } = require('schemas').definitions;
const { permissions: api } = require('src/api');
const { create, read, remove } = require('src/middlewares/methods');
const { permissions } = require('src/permissions');
const contexts = require('src/contexts');


module.exports = [
  _.post('/teams/:team_id/permissions/', create(api.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.permission.createAccess
    }
  })),

  _.get('/teams/:team_id/permissions/', read(api.list)),

  _.get('/teams/:team_id/permissions/:id', read(api.get)),

  _.delete('/teams/:team_id/permissions/:id', remove(api.remove, {
    access: {
      permission: permissions.remove,
      context: contexts.permission.removeAccess
    }
  }))
];
