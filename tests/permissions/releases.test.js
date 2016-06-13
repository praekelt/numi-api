const { expect } = require('chai');
const { releases } = require('src/permissions');


describe("permissions.releases", () => {
  describe("create", () => {
    it("should define the permissions needed to create", () => {
      expect(releases.create.definition({
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

  describe("list", () => {
    it("should define the permissions needed to list", () => {
      expect(releases.list.definition({
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
        }, {
          namespace: 'numi',
          type: 'project:read',
          object_id: 23
        }, {
          namespace: 'numi',
          type: 'project:write',
          object_id: 23
        }]);
    });
  });
});
