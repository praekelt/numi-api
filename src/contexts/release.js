const dialogue = require('src/contexts/dialogue');
const releases = require('src/core/releases');


function access(releaseId) {
  return releases.get(releaseId)
    .then(({data: {dialogue_id}}) => dialogue.access(dialogue_id))
    .then(({dialogueId, projectId, organizationId}) => ({
      releaseId,
      dialogueId,
      projectId,
      organizationId
    }));
}


module.exports = {
  access
};
