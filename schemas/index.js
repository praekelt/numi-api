const { read } = require('src/utils');
const { resolve } = require('path');
const deref = require('json-schema-deref-sync');
const jsonPatch = require('./json-patch');


function readSchema(path) {
  return read(resolve(__dirname, path));
}


module.exports = deref({
  definitions: {
    json_patch: jsonPatch,
    config: readSchema('./config.yml'),
    release: readSchema('./release.yml'),
    user: {
      summary: readSchema('./user/summary.yml')
    },
    permission: {
      permission: readSchema('./permission/permission.yml')
    },
    organization: {
      summary: readSchema('./organization/summary.yml')
    },
    team: {
      team: readSchema('./team/team.yml'),
      summary: readSchema('./team/summary.yml')
    },
    project: {
      project: readSchema('./project/project.yml'),
      summary: readSchema('./project/summary.yml')
    },
    dialogue: {
      dialogue: readSchema('./dialogue/dialogue.yml'),
      summary: readSchema('./dialogue/summary.yml'),
      sequence: readSchema('./dialogue/sequence.yml'),
      block: readSchema('./dialogue/block.yml'),
      symbol: readSchema('./dialogue/symbol.yml')
    },
    revision: {
      revision: readSchema('./revision/revision.yml'),
      revert: readSchema('./revision/revert.yml'),
      edit: readSchema('./revision/edit.yml')
    },
    channel: {
      channel: readSchema('./channel/channel.yml'),
      summary: readSchema('./channel/summary.yml')
    },
    provider: {
      provider: readSchema('./provider/provider.yml'),
      summary: readSchema('./provider/summary.yml')
    }
  }
});
