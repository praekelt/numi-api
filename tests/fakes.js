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
  id: '23',
  title: 'Project Foo'
}));


module.exports = {
  fakeAuthResult,
  fakeProjectsResult,
  fakeProject,
  fakeResource
};
