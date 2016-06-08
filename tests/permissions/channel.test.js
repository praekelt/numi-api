const { expect } = require('chai');
const { channel } = require('src/permissions');


describe("permissions.channel", () => {
  describe("read", () => {
    it("should define the permissions needed to read", () => {
      expect(channel.read.definition({
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
      expect(channel.write.definition({
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
