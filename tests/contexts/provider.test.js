const { expect } = require('chai');
const { provider } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe("contexts.provider", () => {
  describe("access", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => provider.access())
        .to.throw(NotImplementedError);
    });
  });
});
