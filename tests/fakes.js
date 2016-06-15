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


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeProvidersResult,
  fakeProject,
  fakeResource,
  fakeProvider
};
