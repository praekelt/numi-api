const Koa = require('koa');
const request = require('supertest');
const {
  NotImplementedError,
  ValidationError
} = require('src/errors');
const {
  notImplementedError,
  validationError
} = require('src/middleware/api/errors');


describe('middleware/api/errors', () => {
  describe('notImplementedError', () => {
    it('should handle NotImplementedErrors', done => {
      const app = new Koa()
        .use(notImplementedError)
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

  describe('validationError', () => {
    it('should handle ValidationErrors', done => {
      const app = new Koa()
        .use(validationError)
        .use(() => {
          throw new ValidationError([{
            type: 'type',
            path: '/foo/bar',
            schema_path: '#/properties/foo/properties/bar/type',
            details: {type: 'number'},
            message: "should be number"
          }]);
        });

      request(app.listen())
        .get('/')
        .expect(422)
        .expect({
          type: 'validation_error',
          message: "Invalid request",
          details: {
            errors: [{
              type: 'type',
              path: '/foo/bar',
              schema_path: '#/properties/foo/properties/bar/type',
              details: {type: 'number'},
              message: "should be number"
            }]
          }
        })
        .end(done);
    });
  });
});
