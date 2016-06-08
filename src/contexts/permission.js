const { NotImplementedError } = require('src/errors');
const project = require('src/contexts/project');


function createAccess(teamId, permission) {
  const {
    type,
    object_id: id
  } = permission;

  switch (type) {
    case 'project:admin':
    case 'project:read':
    case 'project:write':
      return project.access(id);

    default:
      return Promise.reject(new NotImplementedError());
  }
}


function removeAccess() {
  throw new NotImplementedError();
}


module.exports = {
  createAccess,
  removeAccess
};
