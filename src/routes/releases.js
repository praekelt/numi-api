const _ = require('koa-route');
const { release: schema } = require('schemas').definitions;
const { releases } = require('src/api');
const { create, list } = require('src/middlewares/methods');
const { releases: permissions } = require('src/permissions');
const contexts = require('src/contexts');


module.exports = [
  _.post('/dialogue/:dialogue_id/releases/', create(releases.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.release.access
    }
  })),

  _.get('/dialogue/:dialogue_id/releases/', list(releases.list, {
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'},
        ordering: {default: '-number'}
      }
    },
    access: {
      permission: permissions.list,
      context: contexts.release.access
    }
  }))
];
