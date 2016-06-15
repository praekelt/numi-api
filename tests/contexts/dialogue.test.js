const { expect } = require('chai');
const { sandbox } = require('sinon');

const { dialogue } = require('src/contexts');
const projects = require('src/core/projects');
const dialogues = require('src/core/dialogues');

const {
  fakeProject,
  fakeDialogue,
  fakeDialoguesResult,
  fakeProjectsResult
} = require('tests/fakes');


describe("contexts.dialogue", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("access", () => {
    it("should get the dialogue's access context", () => {
      this.sandbox.stub(projects, 'get')
        .withArgs(1)
        .returns(fakeProjectsResult(fakeProject({
          id: 1,
          organization_id: 1
        })));

      this.sandbox.stub(dialogues, 'get')
        .withArgs(1)
        .returns(fakeDialoguesResult(fakeDialogue({
          id: 1,
          project_id: 1
        })));

      return dialogue.access(1)
        .then(res => expect(res).to.deep.equal({
          dialogueId: 1,
          projectId: 1,
          organizationId: 1
        }));
    });
  });
});
