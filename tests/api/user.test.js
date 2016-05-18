const { expect } = require('chai');
const { user } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.user', () => {
  describe('getPermissions', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => user.getPermissions())
        .to.throw(NotImplementedError);
    });
  });
});
