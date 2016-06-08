const { expect } = require('chai');
const { permission } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe('contexts.permission', () => {
  describe('createAccess', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => permission.createAccess())
        .to.throw(NotImplementedError);
    });
  });

  describe('removeAccess', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => permission.removeAccess())
        .to.throw(NotImplementedError);
    });
  });
});
