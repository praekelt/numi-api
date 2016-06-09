const { expect } = require('chai');
const { permissions } = require('src/permissions');


describe("permissions.permissions", () => {
  describe("create", () => {
    it("should define the permissions needed to create", () => {
      expect(permissions.create.definition({
          organizationId: 21,
          projectId: 23
        }))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }, {
          namespace: 'numi',
          type: 'project:admin',
          object_id: 23
        }]);
    });
  });

  describe("remove", () => {
    it("should define the permissions needed to remove", () => {
      expect(permissions.create.definition({
          organizationId: 21,
          projectId: 23
        }))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }, {
          namespace: 'numi',
          type: 'project:admin',
          object_id: 23
        }]);
    });
  });
});
