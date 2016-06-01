const _ = require('koa-route');
const { dialogue: { dialogue: schema } } = require('schemas').definitions;
const { dialogues } = require('src/api');
const { create, read, update, patch } = require('src/middlewares/methods');


module.exports = [
  _.post('/projects/:project_id/dialogues/', create(dialogues.create, {
    schema
  })),

  _.get('/projects/:project_id/dialogues/', read(dialogues.list)),

  _.get('/dialogues/:id', read(dialogues.get)),

  _.get('/dialogues/:id/teams/', read(dialogues.getTeams)),

  _.put('/dialogues/:id', update(dialogues.update, {
    schema
  })),

  _.patch('/dialogues/:id', patch(dialogues.patch))
];
