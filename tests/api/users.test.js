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

  describe('getAll', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.getAll())
        .to.throw(NotImplementedError);
    });
  });

  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.get())
        .to.throw(NotImplementedError);
    });
  });

  describe('update', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.update())
        .to.throw(NotImplementedError);
    });
  });

  describe('patch', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => users.patch())
        .to.throw(NotImplementedError);
    });
  });
});
