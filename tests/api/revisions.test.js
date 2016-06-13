const { expect } = require('chai');
const { revisions } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe("api.revisions", () => {
  describe("create", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => revisions.create())
        .to.throw(NotImplementedError);
    });
  });

  describe("list", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => revisions.list())
        .to.throw(NotImplementedError);
    });
  });
});
