const { expect } = require('chai');
const dialogues = require('src/core/dialogues');
const { NotImplementedError } = require('src/errors');


describe("core/dialogues", () => {
  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.get())
        .to.throw(NotImplementedError);
    });
  });
});
