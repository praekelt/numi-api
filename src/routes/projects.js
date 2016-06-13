const _ = require('koa-route');
const { project: { project: schema } } = require('schemas').definitions;
const { projects } = require('src/api');
const contexts = require('src/contexts');
const { projects: permissions } = require('src/permissions');

const {
  create,
  list,
  read,
  update,
  patch
} = require('src/middlewares/methods');


module.exports = [
  _.post('/organizations/:orgId/projects/', create(projects.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.organization.access
    }
  })),

  _.get('/projects/', list(projects.list, {
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

  _.get('/projects/:id/teams/', list(projects.listTeams, {
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:id/channels/', list(projects.listChannels, {
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
