const { authConf } = require('src/auth-utils');
const authApi = require('src/auth');


function list(organizationId, {auth}) {
  return authApi.organizations.listTeams(organizationId, {
    conf: authConf(auth)
  });
}


function get(id, {auth}) {
  return authApi.teams.get(id, {conf: authConf(auth)});
}


module.exports = {
  list,
  get
};
