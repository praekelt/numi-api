const _ = require('koa-route');
const { permission: schemas } = require('schemas').definitions;
const { permissions } = require('src/api');
const { create, read, remove } = require('src/middleware/api/methods');


module.exports = [
  _.post(
    '/teams/:team_id/permissions/',
    create(schemas.permission, permissions.create)),

  _.get(
    '/teams/:team_id/permissions/',
    read(permissions.getAll)),

  _.get(
    '/teams/:team_id/permissions/:id',
    read(permissions.get)),

  _.delete(
    '/teams/:team_id/permissions/:id',
    remove(permissions.remove))
];
