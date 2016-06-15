const { expect } = require('chai');
const channels = require('src/core/channels');
const { NotImplementedError } = require('src/errors');


describe("core/channels", () => {
  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => channels.get())
        .to.throw(NotImplementedError);
    });
  });
});
