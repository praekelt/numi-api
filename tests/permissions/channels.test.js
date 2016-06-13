const { expect } = require('chai');
const { channels } = require('src/permissions');


describe("permissions.channels", () => {
  describe("read", () => {
    it("should define the permissions needed to read", () => {
      expect(channels.read.definition({
          organizationId: 21,
          channelId: 23
        }))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }]);
    });
  });

  describe("write", () => {
    it("should define the permissions needed to write", () => {
      expect(channels.write.definition({
          organizationId: 21,
          channelId: 23
        }))
        .to.deep.equal([{
          namespace: 'auth',
          type: 'org:admin',
          object_id: 21
        }]);
    });
  });
});
