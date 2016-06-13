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


module.exports = {
  authResult,
  projectsResult,
  resource
};
