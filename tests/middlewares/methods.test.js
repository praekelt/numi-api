const constant = require('lodash/constant');
const attempt = require('lodash/attempt');
const identity = require('lodash/identity');
const { expect } = require('chai');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');
const request = require('supertest');
const { validationError } = require('src/middlewares/errors');
const { validate } = require('@praekelt/json-schema-utils');
const { json_patch: patchSchema } = require('schemas').definitions;
const multicb = require('multicb');

const {
  authenticationRequiredError
} = require('src/middlewares/errors');

const {
  create,
  list,
  read,
  update,
  patch,
  remove
} = require('src/middlewares/methods');


describe("middlewares/api/methods", () => {
  describe("create", () => {
    it("should validate the request body", done => {
      const app = new Koa()
        .use(validationError)
        .use(bodyParser())
        .use(_.post('/', create(identity, {
          schema: {type: 'string'}
        })));

      request(app.listen())
        .post('/')
        .send({a: 23})
        .expect(resp => {
          const e = attempt(() => validate({type: 'string'}, {a: 23}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it("should apply defaults to the request body", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/', create(identity, {
          schema: {
            type: 'object',
            properties: {a: {default: 23}}
          }
        })));

      request(app.listen())
        .post('/')
        .send({b: 21})
        .expect({
          a: 23,
          b: 21
        })
        .end(done);
    });

    it("should use the api call result as the response body", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/:a/:b', create((a, b, d) => Promise.resolve({
          a,
          b,
          d
        }))));

      request(app.listen())
        .post('/2/3')
        .send({foo: 23})
        .expect({
          a: 2,
          b: 3,
          d: {foo: 23}
        })
        .end(done);
    });

    it("should use the serializer function if given", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/', create(constant({id: 23}), {
          serializer: ({id}) => ({
            id,
            url: `/${id}`
          })
        })));

      request(app.listen())
        .post('/')
        .send({})
        .expect({
          id: 23,
          url: '/23'
        })
        .end(done);
    });

    it("should provide auth to the api function", done => {
      const app = new Koa()
        .use(bodyParser())
        .use((ctx, next) => {
          ctx.auth = {foo: 23};
          return next();
        })
        .use(_.post('/', create((d, opts) => opts.auth)));

      request(app.listen())
        .post('/')
        .send({})
        .expect({foo: 23})
        .end(done);
    });

    it("should set the status code to 201", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/:a/:b', create(identity)));

      request(app.listen())
        .post('/2/3')
        .send({foo: 23})
        .expect(201)
        .end(done);
    });
  });

  describe("read", () => {
    it("should validate the request query parameters", done => {
      const schema = {
        type: 'object',
        properties: {a: {enum: ['23']}}
      };

      const app = new Koa()
        .use(validationError)
        .use(bodyParser())
        .use(_.get('/', read(identity, {schema})));

      request(app.listen())
        .get('/?a=21')
        .expect(resp => {
          const e = attempt(() => validate(schema, {a: '21'}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it("should apply defaults to the request query parameters", done => {
      const app = new Koa()
        .use(_.get('/:a/:b', read((a, b, d) => Promise.resolve({
          a,
          b,
          d
        }), {
          schema: {
            type: 'object',
            properties: {
              y: {default: 20},
              z: {default: 22}
            }
          }
        })));

      request(app.listen())
        .get('/2/3?x=23&y=21')
        .expect({
          a: 2,
          b: 3,
          d: {
            x: 23,
            y: 21,
            z: 22
          }
        })
        .end(done);
    });

    it("should use the api call result as the response body", done => {
      const app = new Koa()
        .use(_.get('/:a/:b', read((a, b, d) => Promise.resolve({
          a,
          b,
          d
        }))));

      request(app.listen())
        .get('/2/3?x=23&y=21')
        .expect({
          a: 2,
          b: 3,
          d: {
            x: 23,
            y: 21
          }
        })
        .end(done);
    });

    it("should use the serializer function if given", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.get('/:id', read(id => ({id}), {
          serializer: ({id}) => ({
            id,
            url: `/${id}`
          })
        })));

      request(app.listen())
        .get('/23')
        .expect({
          id: 23,
          url: '/23'
        })
        .end(done);
    });

    it("should provide auth to the api function", done => {
      const app = new Koa()
        .use(bodyParser())
        .use((ctx, next) => {
          ctx.auth = {foo: 23};
          return next();
        })
        .use(_.get('/', read((d, opts) => opts.auth)));

      request(app.listen())
        .get('/')
        .expect({foo: 23})
        .end(done);
    });
  });

  describe("list", () => {
    it("should validate the request query parameters", done => {
      const schema = {
        type: 'object',
        properties: {a: {enum: ['23']}}
      };

      const app = new Koa()
        .use(validationError)
        .use(bodyParser())
        .use(_.get('/', list(identity, {schema})));

      request(app.listen())
        .get('/?a=21')
        .expect(resp => {
          const e = attempt(() => validate(schema, {a: '21'}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it("should apply defaults to the request query parameters", done => {
      const app = new Koa()
        .use(_.get('/:a/:b', list((a, b, d) => Promise.resolve([
          a,
          b,
          d
        ]), {
          schema: {
            type: 'object',
            properties: {
              y: {default: 20},
              z: {default: 22}
            }
          }
        })));

      request(app.listen())
        .get('/2/3?x=23&y=21')
        .expect([
          2,
          3,
          {
            x: 23,
            y: 21,
            z: 22
          }
        ])
        .end(done);
    });

    it("should use the api call result as the response body", done => {
      const app = new Koa()
        .use(_.get('/:a/:b', list((a, b, d) => Promise.resolve([
          a,
          b,
          d
        ]))));

      request(app.listen())
        .get('/2/3?x=23&y=21')
        .expect([
          2,
          3,
          {
            x: 23,
            y: 21
          }
        ])
        .end(done);
    });

    it("should use the serializer function if given", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.get('/', list(constant([{id: 21}, {id: 23}]), {
          serializer: ({id}) => ({
            id,
            url: `/${id}`
          })
        })));

      request(app.listen())
        .get('/')
        .expect([{
          id: 21,
          url: '/21'
        }, {
          id: 23,
          url: '/23'
        }])
        .end(done);
    });

    it("should provide auth to the api function", done => {
      const app = new Koa()
        .use(bodyParser())
        .use((ctx, next) => {
          ctx.auth = {foo: 23};
          return next();
        })
        .use(_.get('/', list((d, opts) => [opts.auth])));

      request(app.listen())
        .get('/')
        .expect([{foo: 23}])
        .end(done);
    });

    it("should assume authentication is needed if visibility params are given",
    done => {
      const next = multicb();

      const app = new Koa()
      .use(authenticationRequiredError)
      .use(bodyParser())
      .use((ctx, next) => {
        if (ctx.request.query.isLeet) ctx.user = {a: 23};
        return next();
      })
      .use(_.get('/', list(ctx => [21], {
        visibility: {
          permission: true,
          context: null
        }
      })));

      request(app.listen())
        .get('/')
        .expect(401)
        .end(next());

      request(app.listen())
        .get('/')
        .query({isLeet: true})
        .expect(200)
        .expect([21])
        .end(next());

      next(done);
    });

    it("should filter out resources the user does not have permission for",
    done => {
      const app = new Koa()
      .use(authenticationRequiredError)
      .use(bodyParser())
      .use((ctx, next) => {
        ctx.user = {a: 23};
        return next();
      })
      .use(_.get('/', list(ctx => [
        {id: 1},
        {id: 2},
        {id: 3}
      ], {
        visibility: {
          context: ({id}) => id,
          permission: (id, user) => !((id + user.a) % 2)
        }
      })));

      request(app.listen())
        .get('/')
        .expect(200)
        .expect([
          {id: 1},
          {id: 3}
        ])
        .end(done);
    });
  });

  describe("update", () => {
    it("should omit read only fields", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/', update(identity, {
          schema: {
            type: 'object',
            properties: {a: {readOnly: true}}
          }
        })));

      request(app.listen())
        .post('/')
        .send({
          a: 23,
          b: 21
        })
        .expect({b: 21})
        .end(done);
    });

    it("should validate the request body", done => {
      const app = new Koa()
        .use(validationError)
        .use(bodyParser())
        .use(_.post('/', update(identity, {
          schema: {type: 'string'}
        })));

      request(app.listen())
        .post('/')
        .send({a: 23})
        .expect(resp => {
          const e = attempt(() => validate({type: 'string'}, {a: 23}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it("should apply defaults to the request body", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/', update(identity, {
          schema: {
            type: 'object',
            properties: {a: {default: 23}}
          }
        })));

      request(app.listen())
        .post('/')
        .send({b: 21})
        .expect({
          a: 23,
          b: 21
        })
        .end(done);
    });

    it("should use the api call result as the response body", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.put('/:a/:b', update((a, b, d) => Promise.resolve({
          a,
          b,
          d
        }))));

      request(app.listen())
        .put('/2/3')
        .send({foo: 23})
        .expect({
          a: 2,
          b: 3,
          d: {foo: 23}
        })
        .end(done);
    });

    it("should use the serializer function if given", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.put('/:id', update(id => ({id}), {
          serializer: ({id}) => ({
            id,
            url: `/${id}`
          })
        })));

      request(app.listen())
        .put('/23')
        .expect({
          id: 23,
          url: '/23'
        })
        .end(done);
    });

    it("should provide auth to the api function", done => {
      const app = new Koa()
        .use(bodyParser())
        .use((ctx, next) => {
          ctx.auth = {foo: 23};
          return next();
        })
        .use(_.put('/', update((d, opts) => opts.auth)));

      request(app.listen())
        .put('/')
        .send({})
        .expect({foo: 23})
        .end(done);
    });
  });

  describe("patch", () => {
    it("should validate the request body", done => {
      const app = new Koa()
        .use(validationError)
        .use(bodyParser())
        .use(_.post('/', patch(identity)));

      request(app.listen())
        .post('/')
        .send({a: 23})
        .expect(resp => {
          const e = attempt(() => validate(patchSchema, {a: 23}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it("should use the api call result as the response body", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.patch('/:a/:b', patch((a, b, d) => Promise.resolve({
          a,
          b,
          d
        }))));

      request(app.listen())
        .patch('/2/3')
        .send([{
          op: 'add',
          path: '/foo',
          value: 23
        }])
        .expect({
          a: 2,
          b: 3,
          d: [{
            op: 'add',
            path: '/foo',
            value: 23
          }]
        })
        .end(done);
    });

    it("should provide auth to the api function", done => {
      const app = new Koa()
        .use(bodyParser())
        .use((ctx, next) => {
          ctx.auth = {foo: 23};
          return next();
        })
        .use(_.patch('/', patch((d, opts) => opts.auth)));

      request(app.listen())
        .patch('/')
        .send([])
        .expect({foo: 23})
        .end(done);
    });

    it("should use the serializer function if given", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.patch('/:id', patch(id => ({id}), {
          serializer: ({id}) => ({
            id,
            url: `/${id}`
          })
        })));

      request(app.listen())
        .patch('/23')
        .send([])
        .expect({
          id: 23,
          url: '/23'
        })
        .end(done);
    });
  });

  describe("remove", () => {
    it("should use the api call result as the response body", done => {
      const app = new Koa()
        .use(_.delete('/:a/:b', remove((a, b) => Promise.resolve({
          a,
          b
        }))));

      request(app.listen())
        .delete('/2/3')
        .expect({
          a: 2,
          b: 3
        })
        .end(done);
    });

    it("should use the serializer function if given", done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.delete('/:id', remove(id => ({id}), {
          serializer: ({id}) => ({
            id,
            url: `/${id}`
          })
        })));

      request(app.listen())
        .delete('/23')
        .expect({
          id: 23,
          url: '/23'
        })
        .end(done);
    });

    it("should provide auth to the api function", done => {
      const app = new Koa()
        .use(bodyParser())
        .use((ctx, next) => {
          ctx.auth = {foo: 23};
          return next();
        })
        .use(_.delete('/', remove(opts => opts.auth)));

      request(app.listen())
        .delete('/')
        .expect({foo: 23})
        .end(done);
    });
  });
});
