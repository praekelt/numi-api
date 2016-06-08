const { expect } = require('chai');
const { channel } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe('contexts.channel', () => {
  describe('access', () => {
    it('should throw a NotImplementedError', () => {
      expect(() => channel.access())
        .to.throw(NotImplementedError);
    });
  });
});
