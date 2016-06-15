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


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeProvidersResult,
  fakeChannelsResult,
  fakeProject,
  fakeResource,
  fakeProvider,
  fakeChannel
};
