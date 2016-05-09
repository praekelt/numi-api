const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');
const request = require('supertest');
const {
  create,
  read,
  update,
  patch,
  remove
} = require('src/middleware/api/methods');


describe('middlewares/api/methods', () => {
  describe('create', () => {
    it('should validate the request body');

    it('should apply defaults to the request body');

    it('should use the api call result as the response body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.post('/:a/:b', create({}, (a, b, d) => Promise.resolve({
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
        .use(_.post('/:a/:b', create({}, () => ({}))));

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
        }), () => ({
          y: 20,
          z: 22
        }))));

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
    it('should omit read only fields');

    it('should validate the request body');

    it('should apply defaults to the request body');

    it('should use the api call result as the response body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.put('/:a/:b', update({}, (a, b, d) => Promise.resolve({
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
    it('should validate the request body');

    it('should use the api call result as the response body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(_.patch('/:a/:b', patch({}, (a, b, d) => Promise.resolve({
          a,
          b,
          d
        }))));

      request(app.listen())
        .patch('/2/3')
        .send({foo: 23})
        .expect({
          a: 2,
          b: 3,
          d: {foo: 23}
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
