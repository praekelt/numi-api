const Koa = require('koa');
const request = require('supertest');
const errorTypes = require('src/errors');
const errors = require('src/middleware/api/errors');
const NotImplementedError = errorTypes.NotImplementedError;
const notImplemented = errors.notImplemented;


describe('middleware/api/errors', () => {
  describe('notImplemented', () => {
    it('should handle NotImplementedErrors', done => {
      const app = new Koa()
        .use(notImplemented)
        .use(() => { throw new NotImplementedError(); });

      request(app.listen())
        .get('/')
        .expect(501)
        .expect({
          type: 'not_implemented'
        })
        .end(done);
    });
  });
});
