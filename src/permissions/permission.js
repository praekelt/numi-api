const has = require('lodash/has');
const find = require('lodash/find');
const extend = require('lodash/extend');
const config = require('src/config');


const configNamespaces = {
  numi: config.permissionNamespace,
  auth: config.authPermissionNamespace
};


function permission(def, namespaces = configNamespaces) {
  const fn = (ctx, user) => (
        user.admin
     || permissionsIntersect(user, def(ctx), namespaces));

  return extend(fn, {definition: def});
}


function permissionsIntersect(user, permissions, namespaces) {
  return hasIntersection(
    user.permissions.map(parseUserPermission),
    permissions.map(d => parsePermission(d, namespaces)));
}


function parsePermission({type, object_id, namespace}, namespaces) {
  if (!has(namespaces, namespace)) {
    throw new Error(`Unknown permission namespace '${namespace}'`);
  }

  return {
    type,
    object_id,
    namespace: namespaces[namespace]
  };
}


function parseUserPermission({type, object_id, namespace}) {
  return {
    type,
    object_id,
    namespace
  };
}


function hasIntersection(a, b) {
  return a.some(d => find(b, d));
}


module.exports = permission;
