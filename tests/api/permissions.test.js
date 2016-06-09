const { expect } = require('chai');
const { permissions } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.permissions', () => {
  describe('create', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => permissions.create())
        .to.throw(NotImplementedError);
    });
  });

  describe('remove', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => permissions.remove())
        .to.throw(NotImplementedError);
    });
  });
});
