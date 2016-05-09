const Koa = require('koa');
const request = require('supertest');
const next = require('src/middleware/util/next');


describe('middleware/util/next', () => {
  it('should be a noop', done => {
    const app = new Koa()
      .use(next)
      .use(ctx => { ctx.body = {foo: 23}; });

    request(app.listen())
      .get('/')
      .expect({foo: 23})
      .end(done);
  });
});
