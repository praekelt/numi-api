const user = require('src/api/user');
const teams = require('src/api/teams');
const permissions = require('src/api/permissions');
const projects = require('src/api/projects');
const dialogues = require('src/api/dialogues');
const revisions = require('src/api/revisions');
const releases = require('src/api/releases');
const channels = require('src/api/channels');
const providers = require('src/api/providers');


module.exports = {
  user,
  teams,
  permissions,
  projects,
  dialogues,
  revisions,
  releases,
  channels,
  providers
};
