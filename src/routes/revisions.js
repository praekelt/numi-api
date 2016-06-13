const _ = require('koa-route');
const { revision: { revision: schema } } = require('schemas').definitions;
const { revisions } = require('src/api');
const { create, list } = require('src/middlewares/methods');
const { dialogues: permissions } = require('src/permissions');
const contexts = require('src/contexts');


module.exports = [
  _.post('/dialogue/:dialogue_id/revisions/', create(revisions.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.dialogue.access
    }
  })),

  _.get('/dialogue/:dialogue_id/revisions/', list(revisions.list, {
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
      context: contexts.dialogue.access
    }
  }))
];
