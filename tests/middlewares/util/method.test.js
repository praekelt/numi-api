const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const _ = require('koa-route');
const constant = require('lodash/constant');
const method = require('src/middleware/util/method');
const multicb = require('multicb');
const {
  authenticationRequiredError,
  authorizationError
} = require('src/middleware/api/errors');


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

  it("should assume authentication is needed if a permission is given", done => {
    const next = multicb();

    const app = new Koa()
      .use(authenticationRequiredError)
      .use(bodyParser())
      .use((ctx, next) => {
        if (ctx.request.body.isLeet) ctx.user = {a: 23};
        return next();
      })
      .use(_.put('/', method({permission: constant(true)}, ctx => {
        ctx.body = {a: 23};
      })));

    request(app.listen())
      .put('/')
      .send({isLeet: false})
      .expect(401)
      .end(next());

    request(app.listen())
      .put('/')
      .send({isLeet: true})
      .expect(200)
      .expect({a: 23})
      .end(next());

    next(done);
  });

  it("should support permission checking", done => {
    const next = multicb();

    const app = new Koa()
      .use(authorizationError)
      .use(bodyParser())
      .use((ctx, next) => {
        ctx.user = ctx.request.body;
        return next();
      })
      .use(_.put('/', method({permission: d => d.isLeet}, ctx => {
        ctx.body = {a: 23};
      })));

    request(app.listen())
      .put('/')
      .send({isLeet: false})
      .expect(403)
      .end(next());

    request(app.listen())
      .put('/')
      .send({isLeet: true})
      .expect(200)
      .expect({a: 23})
      .end(next());

    next(done);
  });
});
