const _ = require('koa-route');
const { release: schema } = require('schemas').definitions;
const { releases } = require('src/api');
const { create, read } = require('src/middlewares/methods');


module.exports = [
  _.post('/dialogue/:dialogue_id/releases/', create(releases.create, {
    schema
  })),

  _.get('/dialogue/:dialogue_id/releases/', read(releases.list, {
    schema: {
      type: 'object',
      properties: {
        page: {default: '1'},
        per_page: {default: '100'},
        ordering: {default: '-number'}
      }
    }
  })),

  _.get('/releases/:id', read(releases.get))
];
