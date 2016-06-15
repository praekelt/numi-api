const { fakeChannel, fakeChannelsResult } = require('tests/fakes');


module.exports = (sandbox, channels) => {
  sandbox.stub(channels, 'get')
    .withArgs('1')
    .returns(fakeChannelsResult(fakeChannel({
      id: '1',
      organization_id: '1'
    })));
};
