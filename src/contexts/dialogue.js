const project = require('src/contexts/project');
const dialogues = require('src/core/dialogues');


function access(dialogueId) {
  return dialogues.get(dialogueId)
    .then(({data: {project_id}}) => project.access(project_id))
    .then(({projectId, organizationId}) => ({
      dialogueId,
      projectId,
      organizationId
    }));
}


module.exports = {
  access
};
