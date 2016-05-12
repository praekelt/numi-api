const user = require('src/routes/user');
const users = require('src/routes/users');
const password = require('src/routes/password');
const permissions = require('src/routes/permissions');
const projects = require('src/routes/projects');
const dialogues = require('src/routes/dialogues');
const revisions = require('src/routes/revisions');
const releases = require('src/routes/releases');
const channels = require('src/routes/channels');
const providers = require('src/routes/providers');


module.exports = [].concat(...[
  user,
  users,
  password,
  permissions,
  projects,
  dialogues,
  revisions,
  releases,
  channels,
  providers
]);
