const _ = require('koa-route');
const { revision: {revision: schema} } = require('schemas').definitions;
const { revisions } = require('src/api');
const { create, read } = require('src/middleware/api/methods');


module.exports = [
  _.post('/dialogue/:dialogue_id/revisions/', create(revisions.create, {
    schema
  })),

  _.get('/dialogue/:dialogue_id/revisions/', read(revisions.list, {
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'},
        ordering: {default: '-number'}
      }
    }
  }))
];
