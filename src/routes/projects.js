const _ = require('koa-route');
const { project: { project: schema } } = require('schemas').definitions;
const { projects } = require('src/api');
const { create, read, update, patch } = require('src/middlewares/methods');
const contexts = require('src/contexts');
const { project: permissions } = require('src/permissions');


module.exports = [
  _.post('/organizations/:orgId/projects/', create(projects.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.organization.access
    }
  })),

  _.get('/projects/', read(projects.list, {
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'}
      }
    },
    // TODO define permissions for visibility
    access: {permission: true}
  })),

  _.get('/projects/:id', read(projects.get, {
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:id/teams/', read(projects.listTeams, {
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:id/channels/', read(projects.listChannels, {
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.put('/projects/:id', update(projects.update, {
    schema,
    access: {
      permission: permissions.write,
      context: contexts.project.access
    }
  })),

  _.patch('/projects/:id', patch(projects.patch, {
    access: {
      permission: permissions.write,
      context: contexts.project.access
    }
  }))
];
