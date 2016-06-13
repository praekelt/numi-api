const { expect } = require('chai');
const { fakeResource } = require('tests/fakes');


describe("tests/fakes", () => {
  describe("fakeResource", () => {
    it("should support defaults", () => {
      const fake = fakeResource(() => ({foo: 23}));

      expect(fakeResource({}))
        .to.deep.equal({foo: 23});
    });
  });
});
