const { expect } = require('chai');
const { sandbox } = require('sinon');
const { provider } = require('src/contexts');
const { fakeProvidersResult } = require('tests/fakes');
const providers = require('src/core/providers');


describe("contexts.provider", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("access", () => {
    it("should get the provider's access context", () => {
      this.sandbox.stub(providers, 'get')
        .withArgs('23')
        .returns(fakeProvidersResult({
          id: '23',
          organization_id: '21'
        }));

        return provider.access('23')
          .then(res => expect(res).to.deep.equal({
            providerId: '23',
            organizationId: '21'
          }));
    });
  });
});
