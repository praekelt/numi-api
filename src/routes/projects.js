const _ = require('koa-route');
const { project: schemas } = require('schemas').definitions;
const { projects } = require('src/api');
const { create, read, update, patch } = require('src/middleware/api/methods');


module.exports = [
  _.post('/projects/', create(schemas.project, projects.create)),
  _.get('/projects/', read(projects.getAll, () => ({
    page: 1,
    per_page: 100
  }))),
  _.get('/projects/:id', read(projects.get)),
  _.get('/projects/:id/teams/', read(projects.getTeams)),
  _.get('/projects/:id/channels/', read(projects.getChannels)),
  _.put('/projects/:id', update(schemas.project, projects.update)),
  _.patch('/projects/:id', patch(schemas.project, projects.patch))
];
