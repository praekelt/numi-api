const { conj } = require('src/utils');


function authResult(data) {
  return Promise.resolve({data});
}


function projectsResult(data) {
  return Promise.resolve({data});
}


function resource(defaults) {
  return (d = {}) => conj(defaults(), d);
}


const project = resource(() => ({
  id: '23',
  title: 'Project Foo'
}));


module.exports = {
  authResult,
  projectsResult,
  project,
  resource
};
