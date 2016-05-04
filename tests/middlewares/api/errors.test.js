const Koa = require('koa');
const request = require('supertest');
const { NotImplementedError } = require('src/errors');
const { notImplemented } = require('src/middleware/api/errors');


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
