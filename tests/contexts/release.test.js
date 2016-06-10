const { expect } = require('chai');
const { release } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe("contexts.release", () => {
  describe("access", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => release.access())
        .to.throw(NotImplementedError);
    });
  });
});
