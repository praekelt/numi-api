const { expect } = require('chai');
const { release } = require('src/permissions');


describe("permissions.release", () => {
  describe("create", () => {
    it("should define the permissions needed to create", () => {
      expect(release.create.definition({
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
      expect(release.list.definition({
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
