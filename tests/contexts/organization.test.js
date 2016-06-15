const { expect } = require('chai');
const { organization } = require('src/contexts');


describe("contexts.organization", () => {
  describe("access", () => {
    it("should get the organizations access context", () => {
      expect(organization.access(23))
        .to.deep.equal({organizationId: 23});
    });
  });
});
