const { expect } = require('chai');
const { providers } = require('src/permissions');


describe("permissions.providers", () => {
  describe("read", () => {
    it("should define the permissions needed to read", () => {
      expect(providers.read.definition({
          organizationId: 21,
          providersId: 23
        }))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }]);
    });
  });
});
