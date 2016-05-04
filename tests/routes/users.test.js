const request = require('supertest');
const app = require('src');


describe('/users/', () => {
  describe('POST /users/', () => {
    it('should respond with a 501', done => {
      request(app.listen())
        .post('/users/', {})
        .expect(501)
        .expect({
          type: 'not_implemented'
        })
        .end(done);
    });
  });
});
