const { expect } = require('chai');
const { dialogue } = require('src/contexts');
const { NotImplementedError } = require('src/errors');


describe("contexts.dialogue", () => {
  describe("access", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogue.access())
        .to.throw(NotImplementedError);
    });
  });
});
