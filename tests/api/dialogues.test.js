const { expect } = require('chai');
const { dialogues } = require('src/api');
const { NotImplementedError } = require('src/errors');


describe("api.dialogues", () => {
  describe("create", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.create())
        .to.throw(NotImplementedError);
    });
  });

  describe("list", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.list())
        .to.throw(NotImplementedError);
    });
  });

  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.get())
        .to.throw(NotImplementedError);
    });
  });

  describe("listTeams", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.listTeams())
        .to.throw(NotImplementedError);
    });
  });

  describe("update", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.update())
        .to.throw(NotImplementedError);
    });
  });

  describe("patch", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => dialogues.patch())
        .to.throw(NotImplementedError);
    });
  });
});
