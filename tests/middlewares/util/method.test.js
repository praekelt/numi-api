const Koa = require('koa');
const request = require('supertest');
const _ = require('koa-route');
const method = require('src/middleware/util/method');


describe('middlewares/util/methods', () => {
  it("should call the given method function", done => {
    const app = new Koa()
      .use(_.get('/:a/:b', method(null, (ctx, args, next) => {
        ctx.body = args;
        return next();
      })));

    request(app.listen())
      .get('/a/b')
      .expect(['a', 'b'])
      .end(done);
  });
});
