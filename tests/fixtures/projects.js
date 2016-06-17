const { fakeProject, fakeProjectsResult } = require('tests/fakes');


module.exports = (sandbox, projects) => {
  const get = sandbox.stub(projects, 'get');

  get
    .withArgs('1')
    .returns(fakeProjectsResult(fakeProject({
      id: '1',
      organization_id: '1'
    })));

  get
    .withArgs('3')
    .returns(fakeProjectsResult(fakeProject({
      id: '3',
      organization_id: '2'
    })));

  get
    .withArgs('4')
    .returns(fakeProjectsResult(fakeProject({
      id: '4',
      organization_id: '2'
    })));
};
