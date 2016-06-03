const { expect } = require('chai');
const { project } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe('contexts.project', () => {
  describe('access', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => project.access())
        .to.throw(NotImplementedError);
    });
  });
});
