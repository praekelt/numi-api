const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const _ = require('koa-route');
const method = require('src/middlewares/method');
const multicb = require('multicb');
const {
  authenticationRequiredError,
  authorizationError
} = require('src/middlewares/errors');


describe("middlewares/method", () => {
  it("should call the given method function", done => {
    const app = new Koa()
      .use(_.get('/:a/:b', method(null, (ctx, args, opts, next) => {
        ctx.body = args;
        return next();
      })));

    request(app.listen())
      .get('/a/b')
      .expect(['a', 'b'])
      .end(done);
  });

  it("should assume authentication is needed if a permission is given",
  done => {
    const next = multicb();

    const app = new Koa()
      .use(authenticationRequiredError)
      .use(bodyParser())
      .use((ctx, next) => {
        if (ctx.request.body.isLeet) ctx.user = {a: 23};
        return next();
      })
      .use(_.put('/', method({
        access: {
          permission: true,
          context: null
        }
      }, ctx => {
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

  it("should support access checking", done => {
    const next = multicb();

    const app = new Koa()
      .use(authorizationError)
      .use(bodyParser())
      .use((ctx, next) => {
        ctx.auth = {foo: 23};
        ctx.user = ctx.request.body;
        return next();
      })
      .use(_.put('/:id', method({
        access: {
          context: (id, {auth}) => Promise.resolve({
            id,
            auth
          }),
          permission: ({id, auth}, {isLeet}) => Promise.resolve(
               id === '21'
            && isLeet
            && auth.foo === 23)
        }
      }, ctx => {
        ctx.body = {a: 23};
      })));

    request(app.listen())
      .put('/21')
      .send({isLeet: false})
      .expect(403)
      .end(next());

    request(app.listen())
      .put('/23')
      .send({isLeet: true})
      .expect(403)
      .end(next());

    request(app.listen())
      .put('/21')
      .send({isLeet: true})
      .expect(200)
      .expect({a: 23})
      .end(next());

    next(done);
  });

  it("should provide auth to the api function", done => {
    const app = new Koa()
      .use(bodyParser())
      .use((ctx, next) => {
        ctx.auth = ctx.request.body;
        return next();
      })
      .use(_.put('/', method(null, (ctx, args, {auth}, next) => {
        ctx.body = auth;
        return next();
      })));

    request(app.listen())
      .put('/')
      .send({foo: 23})
      .expect({foo: 23})
      .end(done);
  });
});
