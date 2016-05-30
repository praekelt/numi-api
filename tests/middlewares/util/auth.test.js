const Koa = require('koa');
const request = require('supertest');
const auth = require('src/middleware/util/auth');
const multicb = require('multicb');


describe('middlewares/util/auth', () => {
  it("should set the auth data on the context", done => {
    const app = new Koa()
      .use(auth())
      .use(ctx => { ctx.body = {auth: ctx.auth}; });

    request(app.listen())
      .get('/')
      .set({Authorization: 'Token 1234 56'})
      .expect({
        auth: {
          type: 'token',
          value: '1234 56'
        }
      })
      .end(done);
  });

  it("should fall back to null if the auth header is not present", done => {
    const app = new Koa()
      .use(auth())
      .use(ctx => { ctx.body = {auth: ctx.auth}; });

    request(app.listen())
      .get('/')
      .expect({auth: null})
      .end(done);
  });

  it("should fall back to null if the auth header is bad", done => {
    const next = multicb();

    const app = new Koa()
      .use(auth())
      .use(ctx => { ctx.body = {auth: ctx.auth}; });

    request(app.listen())
      .get('/')
      .set({Authorization: ''})
      .expect({auth: null})
      .end(next());

    request(app.listen())
      .get('/')
      .set({Authorization: 'abc'})
      .expect({auth: null})
      .end(next());

    next(done);
  });
});
