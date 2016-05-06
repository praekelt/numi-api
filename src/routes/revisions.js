const _ = require('koa-route');
const { revision: schemas } = require('schemas').definitions;
const { revisions } = require('src/api');
const { create, read } = require('src/middleware/api/methods');


module.exports = [
  _.post(
    '/projects/:project_id/dialogue/:dialogue_id/revisions/',
    create(schemas.revision, revisions.create)),

  _.get(
    '/projects/:project_id/dialogue/:dialogue_id/revisions/',
    read(revisions.getAll, () => ({
      page: 1,
      per_page: 100,
      ordering: '-number'
    })))
];