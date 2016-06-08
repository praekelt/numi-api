const _ = require('koa-route');
const { teams } = require('src/api');
const { read } = require('src/middlewares/methods');


module.exports = [
  _.get('/organizations/:id/teams/', read(teams.list)),
  _.get('/teams/:id', read(teams.get))
];
