const { expect } = require('chai');
const releases = require('src/core/releases');
const { NotImplementedError } = require('src/errors');


describe("core/releases", () => {
  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => releases.get())
        .to.throw(NotImplementedError);
    });
  });
});
