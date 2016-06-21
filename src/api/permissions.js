const constant = require('lodash/constant');

const { permissionNamespace: configNamespace } = require('src/config');
const { authConf } = require('src/auth-utils');
const { conj } = require('src/utils');
const authApi = require('src/core/auth');


function create(teamId, d, {auth, namespace = configNamespace}) {
  d = conj(d, {namespace});
  return authApi.teams.addPermission(teamId, d, {conf: authConf(auth)})
    .then(({data}) => data);
}


function remove(teamId, id, {auth}) {
  return authApi.teams.removePermission(teamId, id, {conf: authConf(auth)})
    .then(constant(Promise.resolve(null)));
}


module.exports = {
  create,
  remove
};
