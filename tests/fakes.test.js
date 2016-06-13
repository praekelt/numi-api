const { expect } = require('chai');
const { resource } = require('tests/fakes');


describe("tests/fakes", () => {
  describe("resource", () => {
    it("should support defaults", () => {
      const fake = resource(() => ({foo: 23}));

      expect(fake({}))
        .to.deep.equal({foo: 23});
    });
  });
});
