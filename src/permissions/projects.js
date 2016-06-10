const ary = require('lodash/ary');
const mapValues = require('lodash/mapValues');
const permission = require('src/permissions/permission');


const create = ({organizationId}) => [{
  namespace: 'auth',
  type: 'org:admin',
  object_id: organizationId
}];


const read = ({organizationId, projectId}) => [{
  namespace: 'auth',
  type: 'org:admin',
  object_id: organizationId
}, {
  namespace: 'numi',
  type: 'project:admin',
  object_id: projectId
}, {
  namespace: 'numi',
  type: 'project:read',
  object_id: projectId
}, {
  namespace: 'numi',
  type: 'project:write',
  object_id: projectId
}];


const write = ({organizationId, projectId}) => [{
  namespace: 'auth',
  type: 'org:admin',
  object_id: organizationId
}, {
  namespace: 'numi',
  type: 'project:admin',
  object_id: projectId
}, {
  namespace: 'numi',
  type: 'project:write',
  object_id: projectId
}];


module.exports = mapValues({
  create,
  read,
  write
}, ary(permission, 1));
