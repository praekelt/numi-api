const { expect } = require('chai');
const dialogues = require('src/dialogues');
const { NotImplementedError } = require('src/errors');


describe("dialogues", () => {
  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.get())
        .to.throw(NotImplementedError);
    });
  });
});
