const _ = require('koa-route');
const { teams } = require('src/api');
const { read } = require('src/middlewares/methods');


module.exports = [
  _.get('/teams/', read(teams.list, {
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'}
      }
    }
  })),

  _.get('/teams/:id', read(teams.get))
];
