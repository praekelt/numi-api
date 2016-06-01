const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const constant = require('lodash/constant');
const user = require('src/middlewares/user');


describe('middlewares/user', () => {
  it("should set the user data on the context", done => {
    const app = new Koa()
      .use(bodyParser())
      .use((ctx, next) => {
        ctx.auth = ctx.request.body;
        return next();
      })
      .use(user(d => Promise.resolve(d)))
      .use(ctx => { ctx.body = {user: ctx.user}; });

    request(app.listen())
      .put('/')
      .send({foo: 'bar'})
      .expect({user: {foo: 'bar'}})
      .end(done);
  });

  it("should fall back to null if no auth is present", done => {
    const app = new Koa()
      .use(user(constant({foo: 'bar'})))
      .use(ctx => { ctx.body = {user: ctx.user}; });

    request(app.listen())
      .get('/')
      .expect({user: null})
      .end(done);
  });
});
