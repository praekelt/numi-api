const { expect } = require('chai');
const { releases } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.releases', () => {
  describe('create', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => releases.create())
        .to.throw(NotImplementedError);
    });
  });

  describe('list', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => releases.list())
        .to.throw(NotImplementedError);
    });
  });

  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => releases.get())
        .to.throw(NotImplementedError);
    });
  });
});
