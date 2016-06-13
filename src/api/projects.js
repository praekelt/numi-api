const authApi = require('src/auth');
const { authConf } = require('src/auth-utils');
const { NotImplementedError } = require('src/errors');
const { permissionNamespace: configNamespace } = require('src/config');


function create(orgId, d) {
  throw new NotImplementedError();
}


function list(params) {
  throw new NotImplementedError();
}


function get(id) {
  throw new NotImplementedError();
}


function listChannels(id) {
  throw new NotImplementedError();
}


function listTeams(id, params, {auth, namespace = configNamespace}) {
  // TODO take into account pagination
  return authApi.teams.list({
      namespace,
      object_id: id,
      permission_contains: 'project:',
      conf: authConf(auth)
    })
    .then(({data}) => data);
}


function update(id, d) {
  throw new NotImplementedError();
}


function patch(id, d) {
  throw new NotImplementedError();
}


module.exports = {
  create,
  list,
  get,
  listChannels,
  listTeams,
  update,
  patch
};
