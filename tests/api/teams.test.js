const { expect } = require('chai');
const { teams } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.teams', () => {
  describe('list', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => teams.list())
        .to.throw(NotImplementedError);
    });
  });

  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => teams.get())
        .to.throw(NotImplementedError);
    });
  });
});
