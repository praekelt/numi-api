const { expect } = require('chai');
const { sandbox } = require('sinon');
const { project } = require('src/contexts');
const { fakeProjectsResult } = require('tests/fakes');
const projects = require('src/core/projects');


describe("contexts.project", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("access", () => {
    it("should get the project's access context", () => {
      this.sandbox.stub(projects, 'get')
        .withArgs(23)
        .returns(fakeProjectsResult({
          id: 23,
          organization_id: 21
        }));

        return project.access(23)
          .then(res => expect(res).to.deep.equal({
            projectId: 23,
            organizationId: 21
          }));
    });
  });
});
