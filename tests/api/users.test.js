const expect = require('chai').expect;
const users = require('src/api').users;
const { NotImplementedError } = require('src/errors');


describe('api.users', () => {
  describe('create', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.create())
        .to.throw(NotImplementedError);
    });
  });
});
