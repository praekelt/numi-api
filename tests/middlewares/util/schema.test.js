const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const {
  setDefaults
} = require('src/middleware/util/schema');


describe('middleware/util/schema', () => {
  describe('setDefaults', () => {
    it('should set defaults on the request body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(setDefaults({
          type: 'object',
          properties: {
            foo: {default: 23},
            bar: {default: 21}
          }
        }))
        .use(ctx => { ctx.body = ctx.request.body; });

      request(app.listen())
        .post('/')
        .send({
          foo: 'rar',
          baz: 2
        })
        .expect({
          foo: 'rar',
          bar: 21,
          baz: 2
        })
        .end(done);
    });
  });

  describe('omitReadOnly', () => {
    it('should ignore read only fields given in the request body');
  });

  describe('validate', () => {
    it('should validate the request body');
  });
});
