const _ = require('koa-route');
const { revision: schemas } = require('schemas').definitions;
const { revisions } = require('src/api');
const { create, read } = require('src/middleware/api/methods');


module.exports = [
  _.post(
    '/dialogue/:dialogue_id/revisions/',
    create(schemas.revision, revisions.create)),

  _.get(
    '/dialogue/:dialogue_id/revisions/',
    read(revisions.list, () => ({
      page: 1,
      per_page: 100,
      ordering: '-number'
    })))
];
