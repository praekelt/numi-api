const find = require('lodash/find');
const project = require('src/contexts/project');
const authApi = require('src/auth');
const { authConf } = require('src/auth-utils');
const { NotImplementedError } = require('src/errors');


function createAccess(teamId, permission) {
  return access(permission);
}


function removeAccess(teamId, id, {auth}) {
  return authApi.teams.get(teamId, {conf: authConf(auth)})
    .then(({permissions}) => find(permissions, {id}))
    .then(access);
}


function access(permission) {
  const {
    type,
    object_id: id
  } = permission;

  switch (type) {
    case 'project:admin':
    case 'project:read':
    case 'project:write':
      return project.access(id);

    default:
      return Promise.reject(new NotImplementedError());
  }
}


module.exports = {
  createAccess,
  removeAccess
};
