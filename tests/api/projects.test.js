const { expect } = require('chai');
const { projects } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe('api.projects', () => {
  describe('create', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.create())
        .to.throw(NotImplementedError);
    });
  });

  describe('getAll', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.getAll())
        .to.throw(NotImplementedError);
    });
  });

  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.get())
        .to.throw(NotImplementedError);
    });
  });

  describe('getTeams', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.getTeams())
        .to.throw(NotImplementedError);
    });
  });

  describe('getChannels', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.getChannels())
        .to.throw(NotImplementedError);
    });
  });

  describe('update', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.update())
        .to.throw(NotImplementedError);
    });
  });

  describe('patch', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.patch())
        .to.throw(NotImplementedError);
    });
  });
});
