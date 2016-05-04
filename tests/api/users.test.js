const expect = require('chai').expect;
const users = require('src/api').users;
const errors = require('src/errors');
const NotImplementedError = errors.NotImplementedError;


describe('api.users', () => {
  describe('create', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.create())
        .to.throw(NotImplementedError);
    });
  });
});
