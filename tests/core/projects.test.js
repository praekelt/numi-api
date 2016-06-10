const { expect } = require('chai');
const projects = require('src/core/projects');
const { NotImplementedError } = require('src/errors');


describe("core/projects", () => {
  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.get())
        .to.throw(NotImplementedError);
    });
  });
});
