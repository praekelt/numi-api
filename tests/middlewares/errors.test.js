const Koa = require('koa');
const request = require('supertest');
const { str } = require('src/utils');
const {
  NotImplementedError,
  ValidationError,
  NotFoundError,
  AuthorizationError,
  AuthenticationRequiredError,
  UnsupportedAuthTypeError,
  AuthUnauthorizedError,
  AuthForbiddenError,
  AuthNotFoundError
} = require('src/errors');
const {
  notImplementedError,
  validationError,
  notFoundError,
  authenticationRequiredError,
  authorizationError,
  unsupportedAuthTypeError
} = require('src/middlewares/errors');


describe("middlewares/errors", () => {
  describe("notImplementedError", () => {
    it("should handle NotImplementedErrors", done => {
      const app = new Koa()
        .use(notImplementedError)
        .use(() => { throw new NotImplementedError(); });

      request(app.listen())
        .get('/')
        .expect(501)
        .expect({
          type: 'not_implemented',
          message: "Not implemented"
        })
        .end(done);
    });
  });

  describe("validationError", () => {
    it("should handle ValidationErrors", done => {
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

  describe("notFoundError", () => {
    it("should handle NotFoundErrors", done => {
      const app = new Koa()
        .use(notFoundError)
        .use(() => { throw new NotFoundError(); });

      request(app.listen())
        .get('/')
        .expect(404)
        .expect({
          type: 'not_found',
          message: "Resource not found"
        })
        .end(done);
    });

    it("should handle AuthNotFoundErrors", done => {
      const app = new Koa()
        .use(notFoundError)
        .use(() => { throw new AuthNotFoundError(); });

      request(app.listen())
        .get('/')
        .expect(404)
        .expect({
          type: 'not_found',
          message: "Resource not found"
        })
        .end(done);
    });
  });

  describe("authenticationRequiredError", () => {
    it("should handle AuthenticationRequiredErrors", done => {
      const app = new Koa()
        .use(authenticationRequiredError)
        .use(() => { throw new AuthenticationRequiredError(); });

      request(app.listen())
        .get('/')
        .expect(401)
        .expect({
          type: 'authentication_required_error',
          message: "Authentication details are required for the given request"
        })
        .end(done);
    });

    it("should handle AuthUnauthorizedError", done => {
      const app = new Koa()
        .use(authenticationRequiredError)
        .use(() => { throw new AuthUnauthorizedError(); });

      request(app.listen())
        .get('/')
        .expect(401)
        .expect({
          type: 'authentication_required_error',
          message: "Authentication details are required for the given request"
        })
        .end(done);
    });
  });

  describe("authorizationError", () => {
    it("should handle AuthorizationErrors", done => {
      const app = new Koa()
        .use(authorizationError)
        .use(() => { throw new AuthorizationError(); });

      request(app.listen())
        .get('/')
        .expect(403)
        .expect({
          type: 'authorization_error',
          message: str`
            The given authenticated details do not corresond to the required
            permissions for the given request`
        })
        .end(done);
    });

    it("should handle AuthForbiddenErrors", done => {
      const app = new Koa()
        .use(authorizationError)
        .use(() => { throw new AuthForbiddenError(); });

      request(app.listen())
        .get('/')
        .expect(403)
        .expect({
          type: 'authorization_error',
          message: str`
            The given authenticated details do not corresond to the required
            permissions for the given request`
        })
        .end(done);
    });
  });

  describe("unsupportedAuthTypeError", () => {
    it("should handle UnsupportedAuthTypeErrors", done => {
      const app = new Koa()
        .use(unsupportedAuthTypeError)
        .use(() => { throw new UnsupportedAuthTypeError('foo'); });

      request(app.listen())
        .get('/')
        .expect(401)
        .expect({
          type: 'unsupported_auth_type',
          message: "Authentication type 'foo' is not supported",
          details: {type: 'foo'}
        })
        .end(done);
    });
  });
});
