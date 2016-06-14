const { authConf } = require('src/auth-utils');
const authApi = require('src/core/auth');


function list(organizationId, params, {auth}) {
  return authApi.organizations.listTeams(organizationId, {
      conf: authConf(auth)
    })
    .then(({data}) => data);
}


function get(id, params, {auth}) {
  return authApi.teams.get(id, {conf: authConf(auth)})
    .then(({data}) => data);
}


module.exports = {
  list,
  get
};
