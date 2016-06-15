const { conj } = require('src/utils');


function fakeAuthResult(data) {
  return Promise.resolve({data});
}


function fakeProjectsResult(data) {
  return Promise.resolve({data});
}


function fakeDialoguesResult(data) {
  return Promise.resolve({data});
}


function fakeReleasesResult(data) {
  return Promise.resolve({data});
}


function fakeRevisionsResult(data) {
  return Promise.resolve({data});
}


function fakeResource(defaults) {
  return (d = {}) => conj(defaults(), d);
}


const fakeProject = fakeResource(() => ({
  id: '1',
  organization_id: '1',
  title: 'Org 1 Admins'
}));


const fakeDialogue = fakeResource(() => ({
  id: '1',
  project_id: '1',
  title: 'Dialogue 1'
}));


const fakeRelease = fakeResource(() => ({
  id: '1',
  dialogue_id: '1',
  revision_id: '1',
  number: 1
}));


const fakeRevision = fakeResource(() => ({
  id: '1',
  dialogue_id: '1',
  created: +new Date(0),
  type: 'edit',
  properties: {
    edit_type: 'new_sequence',
    patch: [{
      op: 'add',
      path: '/sequences/',
      value: {title: 'Sequence 1'}
    }]
  }
}));


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeDialoguesResult,
  fakeReleasesResult,
  fakeRevisionsResult,
  fakeProject,
  fakeResource,
  fakeDialogue,
  fakeRelease,
  fakeRevision
};
