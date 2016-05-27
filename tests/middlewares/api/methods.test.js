const { expect } = require('chai');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');
const request = require('supertest');
const { validationError } = require('src/middleware/api/errors');
const { captureError } = require('tests/utils');
const identity = require('lodash/identity');
const { validate } = require('@praekelt/json-schema-utils');
const { json_patch: patchSchema } = require('schemas').definitions;

const {
  create,
  read,
  update,
  patch,
  remove
} = require('src/middleware/api/methods');


describe('middlewares/api/methods', () => {
  describe('create', () => {
    it('should validate the request body', done => {
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
          const e = captureError(() => validate({type: 'string'}, {a: 23}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it('should apply defaults to the request body', done => {
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

    it('should use the api call result as the response body', done => {
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

    it('should set the status code to 201', done => {
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

  describe('read', () => {
    it('should apply defaults to the request query parameters', done => {
      const app = new Koa()
        .use(_.get('/:a/:b', read((a, b, d) => Promise.resolve({
          a,
          b,
          d
        }), {
          defaults: () => ({
            y: 20,
            z: 22
          })
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

    it('should use the api call result as the response body', done => {
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
  });

  describe('update', () => {
    it('should omit read only fields', done => {
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

    it('should validate the request body', done => {
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
          const e = captureError(() => validate({type: 'string'}, {a: 23}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it('should apply defaults to the request body', done => {
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

    it('should use the api call result as the response body', done => {
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
  });

  describe('patch', () => {
    it('should validate the request body', done => {
      const app = new Koa()
        .use(validationError)
        .use(bodyParser())
        .use(_.post('/', patch(identity)));

      request(app.listen())
        .post('/')
        .send({a: 23})
        .expect(resp => {
          const e = captureError(() => validate(patchSchema, {a: 23}));
          expect(resp.body.details.errors).to.deep.equal(e.errors);
        })
        .end(done);
    });

    it('should use the api call result as the response body', done => {
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
  });

  describe('remove', () => {
    it('should use the api call result as the response body', done => {
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
  });
});
