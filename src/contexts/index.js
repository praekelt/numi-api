const organization = require('src/contexts/organization');
const project = require('src/contexts/project');
const provider = require('src/contexts/provider');
const channel = require('src/contexts/channel');
const dialogue = require('src/contexts/dialogue');
const release = require('src/contexts/release');
const permission = require('src/contexts/permission');


module.exports = {
  organization,
  project,
  dialogue,
  release,
  provider,
  channel,
  permission
};
