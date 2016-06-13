const { expect } = require('chai');
const { dialogues } = require('src/permissions');


describe("permissions.dialogues", () => {
  describe("create", () => {
    it("should define the permissions needed to create", () => {
      expect(dialogues.create.definition({
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
      expect(dialogues.list.definition({
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

  describe("read", () => {
    it("should define the permissions needed to read", () => {
      expect(dialogues.read.definition({
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
      expect(dialogues.write.definition({
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
