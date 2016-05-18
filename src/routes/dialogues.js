const _ = require('koa-route');
const { dialogue: schemas } = require('schemas').definitions;
const { dialogues } = require('src/api');
const { create, read, update, patch } = require('src/middleware/api/methods');


module.exports = [
  _.post(
    '/projects/:project_id/dialogues/',
    create(schemas.dialogue, dialogues.create)),

  _.get(
    '/projects/:project_id/dialogues/',
    read(dialogues.getAll)),

  _.get(
    '/dialogues/:id',
    read(dialogues.get)),

  _.get(
    '/dialogues/:id/teams/',
    read(dialogues.getTeams)),

  _.put(
    '/dialogues/:id',
    update(schemas.dialogue, dialogues.update)),

  _.patch(
    '/dialogues/:id',
    patch(schemas.dialogue, dialogues.patch))
];
