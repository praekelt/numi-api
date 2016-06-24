const { conj } = require('src/utils');


function fakeAuthResult(data) {
  return Promise.resolve({data});
}


function fakeProjectsResult(data) {
  return Promise.resolve({data});
}


function fakeProvidersResult(data) {
  return Promise.resolve({data});
}


function fakeChannelsResult(data) {
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


const fakeProvider = fakeResource(() => ({
  id: '1',
  organization_id: '1',
  title: 'Provider 1',
  channels: []
}));


const fakeChannel = fakeResource(() => ({
  id: '1',
  provider_id: '1',
  title: 'Channel 1',
  project_id: null
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


const fakePermission = fakeResource(() => ({
  id: '11',
  object_id: '3',
  type: 'project:admin',
  namespace: 'numi'
}));


const fakeTeam = fakeResource(() => ({
  id: '11',
  url: 'authapi/teams/11/',
  users: [fakeUser()]
}));


const fakeUser = fakeResource(() => ({
  id: '11',
  url: 'authapi/users/11/'
}));


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeDialoguesResult,
  fakeReleasesResult,
  fakeRevisionsResult,
  fakeProvidersResult,
  fakeChannelsResult,
  fakeResource,
  fakeProject,
  fakeDialogue,
  fakeRelease,
  fakeRevision,
  fakeProvider,
  fakeChannel,
  fakePermission,
  fakeTeam,
  fakeUser
};
