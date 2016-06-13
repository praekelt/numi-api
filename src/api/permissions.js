const { permissionNamespace: configNamespace } = require('src/config');
const { authConf } = require('src/auth-utils');
const { conj } = require('src/utils');
const authApi = require('src/auth');


function create(teamId, d, {auth, namespace = configNamespace}) {
  d = conj(d, {namespace});
  return authApi.teams.addPermission(teamId, d, {conf: authConf(auth)})
    .then(({data}) => data);
}


function remove(teamId, id, {auth}) {
  return authApi.teams.removePermission(teamId, id, {conf: authConf(auth)})
    .then(({data}) => data);
}


module.exports = {
  create,
  remove
};
