const { expect } = require('chai');
const { project } = require('src/permissions');


describe("permissions.project", () => {
  describe("create", () => {
    it("should define the permissions needed to create", () => {
      expect(project.create().definition({organizationId: 21}))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }]);
    });
  });

  describe("read", () => {
    it("should define the permissions needed to read", () => {
      expect(project.create().definition({
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

  describe("write", () => {
    it("should define the permissions needed to write", () => {
      expect(project.create().definition({
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
          type: 'project:write',
          object_id: 23
        }]);
    });
  });
});
