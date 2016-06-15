const { fakeProvider, fakeProvidersResult } = require('tests/fakes');


module.exports = (sandbox, providers) => {
  sandbox.stub(providers, 'get')
    .withArgs('1')
    .returns(fakeProvidersResult(fakeProvider({
      id: '1',
      organization_id: '1'
    })));
};
