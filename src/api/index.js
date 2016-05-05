const users = require('src/api/users');
const password = require('src/api/password');
const permissions = require('src/api/permissions');
const projects = require('src/api/projects');
const dialogues = require('src/api/dialogues');
const revisions = require('src/api/revisions');
const releases = require('src/api/releases');
const channels = require('src/api/channels');


module.exports = {
  users,
  password,
  permissions,
  projects,
  dialogues,
  revisions,
  releases,
  channels
};
