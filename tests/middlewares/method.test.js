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


describe('middlewares/methods', () => {
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
        ctx.user = ctx.request.body;
        return next();
      })
      .use(_.put('/:id', method({
        access: {
          context: id => Promise.resolve({id}),
          permission: ({id}, {isLeet}) => Promise.resolve(id === '21' && isLeet)
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
});
