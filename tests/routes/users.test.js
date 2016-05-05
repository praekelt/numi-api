const { expect } = require('chai');
const request = require('supertest');
const app = require('src');
const { users } = require('src/api');
const { stub } = require('sinon');
const { restore } = require('tests/utils');


describe('/users/', () => {
  afterEach(() => {
    restore(users);
  });

  describe('POST /users/', () => {
    it('should use its corresponding api method', done => {
      stub(users, 'create', () => ({fake: 'response'}));

      request(app.listen())
        .post('/users/')
        .send({
          first_name: 'a',
          last_name: 'b',
          password: 'c'
        })
        .expect({fake: 'response'})
        .expect(() => {
          expect(users.create.args)
            .to.deep.equal([[{
              first_name: 'a',
              last_name: 'b',
              password: 'c'
            }]]);
        })
        .end(done);
    });
  });
});
