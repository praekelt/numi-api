const _ = require('koa-route');
const { definitions: { project: { project: schema } } } = require('schemas');
const { projects } = require('src/api');
const { projects: permissions } = require('src/permissions');
const contexts = require('src/contexts');
const serializers = require('src/serializers');

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
    serializer: serializers.project,
    access: {
      permission: permissions.create,
      context: contexts.organization.access
    }
  })),

  _.get('/projects/', list(projects.list, {
    serializer: serializers.project,
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
    serializer: serializers.project,
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:id/teams/', list(projects.listTeams, {
    serializer: serializers.team,
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:id/channels/', list(projects.listChannels, {
    serializer: serializers.channel,
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.put('/projects/:id', update(projects.update, {
    serializer: serializers.project,
    access: {
      permission: permissions.write,
      context: contexts.project.access
    }
  })),

  _.patch('/projects/:id', patch(projects.patch, {
    serializer: serializers.project,
    access: {
      permission: permissions.write,
      context: contexts.project.access
    }
  }))
];
