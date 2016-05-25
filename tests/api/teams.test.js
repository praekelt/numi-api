const { expect } = require('chai');
const { teams } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.teams', () => {
  describe('getAll', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => teams.getAll())
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
