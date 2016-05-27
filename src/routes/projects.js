const _ = require('koa-route');
const { project: { project: schema } } = require('schemas').definitions;
const { projects } = require('src/api');
const { create, read, update, patch } = require('src/middleware/api/methods');


module.exports = [
  _.post('/projects/', create(projects.create, {
    schema
  })),

  _.get('/projects/', read(projects.list, {
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'}
      }
    }
  })),

  _.get('/projects/:id', read(projects.get)),

  _.get('/projects/:id/teams/', read(projects.getTeams)),

  _.get('/projects/:id/channels/', read(projects.getChannels)),

  _.put('/projects/:id', update(projects.update, {
    schema
  })),

  _.patch('/projects/:id', patch(projects.patch))
];
