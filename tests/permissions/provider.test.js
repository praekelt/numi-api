const { expect } = require('chai');
const { provider } = require('src/permissions');


describe("permissions.provider", () => {
  describe("read", () => {
    it("should define the permissions needed to read", () => {
      expect(provider.read.definition({
          organizationId: 21,
          providerId: 23
        }))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }]);
    });
  });
});
