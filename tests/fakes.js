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


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeDialoguesResult,
  fakeProject,
  fakeResource,
  fakeDialogue
};
