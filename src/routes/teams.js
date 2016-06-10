const _ = require('koa-route');
const { teams } = require('src/api');
const { list, read } = require('src/middlewares/methods');
const { team: serializer } = require('src/serializers');


module.exports = [
  _.get('/organizations/:orgId/teams/', list(teams.list, {
    serializer,
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'}
      }
    },
    access: {permission: true}
  })),

  _.get('/teams/:id', read(teams.get, {
    serializer,
    access: {permission: true}
  }))
];
