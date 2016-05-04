const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const error = require('src/middleware/util/error');
const { ValidationError } = require('src/errors');
const {
  setDefaults,
  omitReadOnly,
  validate
} = require('src/middleware/util/schema');


describe('middleware/util/schema', () => {
  describe('setDefaults', () => {
    it('should set defaults on the request body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(setDefaults({
          type: 'object',
          properties: {
            foo: {default: 23},
            bar: {default: 21},
            quux: {
              type: 'object',
              properties: {
                corge: {default: 2},
                grault: {default: 3}
              }
            }
          }
        }))
        .use(ctx => { ctx.body = ctx.request.body; });

      request(app.listen())
        .post('/')
        .send({
          foo: 'rar',
          baz: 1,
          quux: {
            corge: 4,
            garply: 5
          }
        })
        .expect({
          foo: 'rar',
          bar: 21,
          baz: 1,
          quux: {
            corge: 4,
            grault: 3,
            garply: 5
          }
        })
        .end(done);
    });
  });

  describe('omitReadOnly', () => {
    it('should omit read only fields given in the request body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(omitReadOnly({
          type: 'object',
          properties: {
            foo: {readOnly: true},
            bar: {}
          }
        }))
        .use(ctx => { ctx.body = ctx.request.body; });

      request(app.listen())
        .post('/')
        .send({
          foo: 21,
          bar: 23
        })
        .expect({bar: 23})
        .end(done);
    });
  });

  describe('validate', () => {
    it('should validate the request body', done => {
      const app = new Koa()
        .use(bodyParser())
        .use(error(ValidationError, (ctx, e) => {
          ctx.body = e.errors;
        }))
        .use(validate({
          type: 'object',
          properties: {
            foo: {
              type: 'object',
              properties: {
                bar: {
                  type: 'number'
                }
              }
            }
          },
          required: ['foo', 'bar']
        }));

      request(app.listen())
        .post('/')
        .send({foo: {bar: 'rar'}})
        .expect([{
          type: 'required',
          path: '',
          schema_path: '#/required',
          details: {missing_property: 'bar'},
          message: "should have required property 'bar'"
        }, {
          type: 'type',
          path: '/foo/bar',
          schema_path: '#/properties/foo/properties/bar/type',
          details: {type: 'number'},
          message: "should be number"
        }])
        .end(done);
    });
  });
});
