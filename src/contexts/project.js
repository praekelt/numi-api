const projects = require('src/core/projects');


function access(projectId) {
  return projects.get(projectId)
    .then(({data: {organization_id}}) => ({
      projectId,
      organizationId: organization_id
    }));
}


module.exports = {
  access
};
