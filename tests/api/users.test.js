const { expect } = require('chai');
const { users } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.users', () => {
  describe('create', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.create())
        .to.throw(NotImplementedError);
    });
  });
});
