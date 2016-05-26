const _ = require('koa-route');
const { teams } = require('src/api');
const { read } = require('src/middleware/api/methods');


module.exports = [
  _.get('/teams/', read(teams.list, () => ({
    page: 1,
    per_page: 100
  }))),
  _.get('/teams/:id', read(teams.get))
];
