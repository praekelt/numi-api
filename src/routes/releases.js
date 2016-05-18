const _ = require('koa-route');
const { release: schema } = require('schemas').definitions;
const { releases } = require('src/api');
const { create, read } = require('src/middleware/api/methods');


module.exports = [
  _.post(
    '/dialogue/:dialogue_id/releases/',
    create(schema, releases.create)),

  _.get(
    '/dialogue/:dialogue_id/releases/',
    read(releases.getAll, () => ({
      page: 1,
      per_page: 100,
      ordering: '-number'
    }))),

  _.get(
    '/releases/:id',
    read(releases.get, () => ({
      page: 1,
      per_page: 100,
      ordering: '-number'
    })))
];
