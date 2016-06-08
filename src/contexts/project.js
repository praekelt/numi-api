const { NotImplementedError } = require('src/errors');
const projects = require('src/projects');


function access(projectId) {
  return projects.get(projectId)
    .then(({organization_id}) => ({
      projectId,
      organizationId: organization_id
    }));
}


module.exports = {
  access
};
