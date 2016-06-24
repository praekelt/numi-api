const { fakeChannel, fakeChannelsResult } = require('tests/fakes');


module.exports = (sandbox, channels) => {
  const get = sandbox.stub(channels, 'get');

  get
    .withArgs('1')
    .returns(fakeChannelsResult(fakeChannel({
      id: '1',
      provider_id: '1'
    })));
};
