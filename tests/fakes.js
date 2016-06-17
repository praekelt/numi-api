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
  fakeProject,
  fakeResource,
  fakePermission,
  fakeTeam,
  fakeUser
};
