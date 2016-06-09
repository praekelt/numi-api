const _ = require('koa-route');
const contexts = require('src/contexts');
const { permission: { permission: schema } } = require('schemas').definitions;
const { permissions: api } = require('src/api');
const { permissions } = require('src/permissions');
const { create, remove } = require('src/middlewares/methods');


module.exports = [
  _.post('/teams/:team_id/permissions/', create(api.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.permission.createAccess
    }
  })),

  _.delete('/teams/:team_id/permissions/:id', remove(api.remove, {
    access: {
      permission: permissions.remove,
      context: contexts.permission.removeAccess
    }
  }))
];
