const Koa = require('koa');
const request = require('supertest');
const error = require('src/middlewares/error');


describe('middlewares/error', () => {
  it('should handle the errors of the given type with the given handler',
  done => {
    class FooError extends Error {}
    class BarError extends Error {}
    let i = 0;

    const app = new Koa()
      .use(error(FooError, (ctx, e) => {
        ctx.body = {
          type: 'foo',
          message: e.message
        };
      }))
      .use(error(BarError, (ctx, e) => {
        ctx.body = {
          type: 'bar',
          message: e.message
        };
      }))
      .use(() => {
        if (i++) throw new BarError(':/');
        else throw new FooError('o_O');
      });

    request(app.listen())
      .get('/')
      .expect({
        type: 'foo',
        message: 'o_O'
      })
      .end(() => {
        request(app.listen())
          .get('/')
          .expect({
            type: 'bar',
            message: ':/'
          })
          .end(done);
      });
  });

  it('should support multiple error types', done => {
    class FooError extends Error {}
    class BarError extends Error {}
    let i = 0;

    const app = new Koa()
      .use(error([FooError, BarError], (ctx, e) => {
        ctx.body = {
          message: e.message
        };
      }))
      .use(() => {
        if (i++) throw new BarError(':/');
        else throw new FooError('o_O');
      });

    request(app.listen())
      .get('/')
      .expect({message: 'o_O'})
      .end(() => {
        request(app.listen())
          .get('/')
          .expect({message: ':/'})
          .end(done);
      });
  });
});
