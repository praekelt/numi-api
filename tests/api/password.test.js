const { expect } = require('chai');
const { password } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.password', () => {
  describe('reset', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => password.reset())
        .to.throw(NotImplementedError);
    });
  });

  describe('confirm', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => password.confirm())
        .to.throw(NotImplementedError);
    });
  });
});
