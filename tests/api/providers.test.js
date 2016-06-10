const { expect } = require('chai');
const { providers } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe("api.providers", () => {
  describe("list", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => providers.list())
        .to.throw(NotImplementedError);
    });
  });

  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => providers.get())
        .to.throw(NotImplementedError);
    });
  });
});
