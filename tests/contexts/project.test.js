const { expect } = require('chai');
const { stub, restore } = require('sinon');
const { project } = require('src/contexts');
const projects = require('src/projects');


describe('contexts.project', () => {
  afterEach(() => { restore(); });

  describe('access', () => {
    it("should get the project's access context", () => {
      stub(projects, 'get')
        .withArgs(23)
        .returns(Promise.resolve({
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
