const Koa = require('koa');
const request = require('supertest');
const queryDefaults = require('src/middleware/util/query-defaults');


describe('middleware/util/queryDefaults', () => {
  it('should set defaults on the request query params', done => {
    const app = new Koa()
      .use(queryDefaults(() => ({
        bar: 2,
        baz: 3
      })))
      .use(ctx => { ctx.body = ctx.request.query; });

    request(app.listen())
      .get('/')
      .query({
        foo: 23,
        bar: 21
      })
      .expect({
        foo: 23,
        bar: 21,
        baz: 3
      })
      .end(done);
  });
});
