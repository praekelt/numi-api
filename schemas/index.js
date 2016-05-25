const jsonPatch = require('./json-patch');
const build = require('@praekelt/json-schema-utils/build');


module.exports = build(inDir(read => ({
  definitions: {
    json_patch: jsonPatch,
    config: read('config'),
    release: read('release'),
    user: {
      summary: read('user/summary')
    },
    permission: {
      permission: read('permission/permission')
    },
    organization: {
      summary: read('organization/summary')
    },
    team: {
      team: read('team/team'),
      summary: read('team/summary')
    },
    project: {
      project: read('project/project'),
      summary: read('project/summary')
    },
    dialogue: {
      dialogue: read('dialogue/dialogue'),
      summary: read('dialogue/summary'),
      sequence: read('dialogue/sequence'),
      block: read('dialogue/block'),
      symbol: read('dialogue/symbol')
    },
    revision: {
      revision: read('revision/revision'),
      revert: read('revision/revert'),
      edit: read('revision/edit')
    },
    channel: {
      channel: read('channel/channel'),
      summary: read('channel/summary')
    },
    provider: {
      provider: read('provider/provider'),
      summary: read('provider/summary')
    }
  }
})));


function inDir(fn) {
  return read => fn(name => read(`${__dirname}/${name}`));
}
