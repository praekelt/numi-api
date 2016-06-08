const find = require('lodash/find');
const isNull = require('lodash/isNull');
const project = require('src/contexts/project');
const authApi = require('src/auth');
const { effect } = require('src/utils');
const { authConf } = require('src/auth-utils');
const { NotImplementedError, AuthorizationError } = require('src/errors');


function createAccess(teamId, permission) {
  return access(permission)
    .then(effect(v => {
      if (isNull(v)) throw new NotImplementedError();
    }));
}


function removeAccess(teamId, id, {auth}) {
  return authApi.teams.get(teamId, {conf: authConf(auth)})
    .then(({permissions}) => find(permissions, {id}))
    .then(access)
    .then(effect(v => {
      if (isNull(v)) throw new AuthorizationError();
    }));
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
      return Promise.resolve(null);
  }
}


module.exports = {
  createAccess,
  removeAccess
};
