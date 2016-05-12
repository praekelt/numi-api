const { expect } = require('chai');
const { providers } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.providers', () => {
  describe('getAll', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => providers.getAll())
        .to.throw(NotImplementedError);
    });
  });

  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => providers.get())
        .to.throw(NotImplementedError);
    });
  });
});
