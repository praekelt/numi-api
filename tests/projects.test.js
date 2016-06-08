const { expect } = require('chai');
const projects = require('src/projects');
const { NotImplementedError } = require('src/errors');


describe('projects', () => {
  describe('get', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => projects.get())
        .to.throw(NotImplementedError);
    });
  });
});
