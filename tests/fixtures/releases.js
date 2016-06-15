const { fakeRelease, fakeReleasesResult } = require('tests/fakes');


module.exports = (sandbox, releases) => {
  const get = sandbox.stub(releases, 'get');

  get
    .withArgs('1')
    .returns(fakeReleasesResult(fakeRelease({
      id: '1',
      dialogue_id: '1'
    })));
};
