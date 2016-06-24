const { expect } = require('chai');
const { sandbox } = require('sinon');

const { channel } = require('src/contexts');
const providers = require('src/core/providers');
const channels = require('src/core/channels');

const {
  fakeProvider,
  fakeChannel,
  fakeChannelsResult,
  fakeProvidersResult
} = require('tests/fakes');


describe("contexts.channel", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("access", () => {
    it("should get the channel's access context", () => {
      this.sandbox.stub(providers, 'get')
        .withArgs('2')
        .returns(fakeProvidersResult(fakeProvider({
          id: '2',
          organization_id: '3'
        })));

      this.sandbox.stub(channels, 'get')
        .withArgs('1')
        .returns(fakeChannelsResult(fakeChannel({
          id: '1',
          provider_id: '2'
        })));

      return channel.access('1')
        .then(res => expect(res).to.deep.equal({
          channelId: '1',
          providerId: '2',
          organizationId: '3'
        }));
    });
  });
});
