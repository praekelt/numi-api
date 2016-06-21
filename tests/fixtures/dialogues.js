const { fakeDialogue, fakeDialoguesResult } = require('tests/fakes');


module.exports = (sandbox, dialogues) => {
  const get = sandbox.stub(dialogues, 'get');

  get
    .withArgs('1')
    .returns(fakeDialoguesResult(fakeDialogue({
      id: '1',
      project_id: '1'
    })));
};
