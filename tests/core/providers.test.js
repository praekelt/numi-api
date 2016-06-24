const { expect } = require('chai');
const providers = require('src/core/providers');
const { NotImplementedError } = require('src/errors');


describe("core/providers", () => {
  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => providers.get())
        .to.throw(NotImplementedError);
    });
  });
});
