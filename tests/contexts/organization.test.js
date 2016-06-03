const { expect } = require('chai');
const { organization } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe('contexts.organization', () => {
  describe('access', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => organization.access())
        .to.throw(NotImplementedError);
    });
  });
});
