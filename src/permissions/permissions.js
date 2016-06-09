const ary = require('lodash/ary');
const mapValues = require('lodash/mapValues');
const permission = require('src/permissions/permission');


const create = ({organizationId, projectId}) => [{
  namespace: 'auth',
  type: 'org:admin',
  object_id: organizationId
}, {
  namespace: 'numi',
  type: 'project:admin',
  object_id: projectId
}];


const remove = ({organizationId, projectId}) => [{
  namespace: 'auth',
  type: 'org:admin',
  object_id: organizationId
}, {
  namespace: 'numi',
  type: 'project:admin',
  object_id: projectId
}];


module.exports = mapValues({
  create,
  remove
}, ary(permission, 1));
