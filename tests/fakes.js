const { conj } = require('src/utils');


function fakeAuthResult(data) {
  return Promise.resolve({data});
}


function fakeProjectsResult(data) {
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


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeProject,
  fakeResource
};
