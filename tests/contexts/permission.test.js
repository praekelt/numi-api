const { expect } = require('chai');
const { permission } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe('contexts.permission', () => {
  describe('access', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => permission.access())
        .to.throw(NotImplementedError);
    });
  });
});
