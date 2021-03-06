const { expect } = require('chai');
const { channels } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe("api.channels", () => {
  describe("list", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => channels.list())
        .to.throw(NotImplementedError);
    });
  });

  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => channels.get())
        .to.throw(NotImplementedError);
    });
  });

  describe("update", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => channels.update())
        .to.throw(NotImplementedError);
    });
  });

  describe("patch", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => channels.patch())
        .to.throw(NotImplementedError);
    });
  });
});
