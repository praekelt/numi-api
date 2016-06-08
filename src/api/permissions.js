const { NotImplementedError } = require('src/errors');
const { permissionNamespace: configNamespace } = require('src/config');
const { authConf } = require('src/auth-utils');
const { conj } = require('src/utils');
const authApi = require('src/auth');


function create(teamId, d, {auth, namespace = configNamespace}) {
  d = conj(d, {namespace});
  return authApi.teams.addPermission(teamId, d, {conf: authConf(auth)});
}


function remove(teamId, id) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  remove
};
