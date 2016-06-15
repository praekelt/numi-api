const { fakeProject, fakeProjectsResult } = require('tests/fakes');


module.exports = (sandbox, projects) => {
  sandbox.stub(projects, 'get')
    .withArgs('1')
    .returns(fakeProjectsResult(fakeProject({
      id: '1',
      organization_id: '1'
    })));
};
