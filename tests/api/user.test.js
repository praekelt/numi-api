const { expect } = require('chai');
const { user } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.user', () => {
  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => user.get())
        .to.throw(NotImplementedError);
    });
  });

  describe('changePassword', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => user.changePassword())
        .to.throw(NotImplementedError);
    });
  });
});
