const ary = require('lodash/ary');
const mapValues = require('lodash/mapValues');
const permission = require('src/permissions/permission');


const read = ({organizationId}) => [{
  namespace: 'auth',
  type: 'org:admin',
  object_id: organizationId
}];


module.exports = mapValues({
  read
}, ary(permission, 1));
