const _ = require('koa-route');
const { team: schemas } = require('schemas').definitions;
const { teams } = require('src/api');
const { create, read, update, patch } = require('src/middleware/api/methods');


module.exports = [
  _.get('/teams/', read(teams.getAll, () => ({
    page: 1,
    per_page: 100
  }))),
  _.get('/teams/:id', read(teams.get)),
];
