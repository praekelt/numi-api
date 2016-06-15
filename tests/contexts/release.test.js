const { expect } = require('chai');
const { sandbox } = require('sinon');

const { release } = require('src/contexts');
const projects = require('src/core/projects');
const dialogues = require('src/core/dialogues');
const releases = require('src/core/releases');

const {
  fakeProject,
  fakeDialogue,
  fakeRelease,
  fakeProjectsResult,
  fakeDialoguesResult,
  fakeReleasesResult
} = require('tests/fakes');


describe("contexts.release", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("access", () => {
    it("should get the release's access context", () => {
      this.sandbox.stub(projects, 'get')
        .withArgs('3')
        .returns(fakeProjectsResult(fakeProject({
          id: '3',
          organization_id: '4'
        })));

      this.sandbox.stub(dialogues, 'get')
        .withArgs('2')
        .returns(fakeDialoguesResult(fakeDialogue({
          id: '2',
          project_id: '3'
        })));

      this.sandbox.stub(releases, 'get')
        .withArgs('1')
        .returns(fakeReleasesResult(fakeRelease({
          id: '1',
          dialogue_id: '2'
        })));

      return release.access('1')
        .then(res => expect(res).to.deep.equal({
          releaseId: '1',
          dialogueId: '2',
          projectId: '3',
          organizationId: '4'
        }));
    });
  });
});
