const has = require('lodash/has');
const find = require('lodash/find');
const extend = require('lodash/extend');
const isEqual = require('lodash/isEqual');
const intersectionBy = require('lodash/intersectionBy');
const config = require('src/config');


const configNamespaces = {
  numi: config.permissionNamespace,
  auth: config.authPermissionNamespace
};


function permission(def, namespaces = configNamespaces) {
  const fn = (ctx, user) => (user.admin
     || hasIntersection(user.permissions, parsePermissions(def(ctx), namespaces)));

  return extend(fn, {definition: def});
}


function parsePermissions(permissions, namespaces) {
  return permissions.map(d => parsePermission(d, namespaces));
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


function hasIntersection(a, b) {
  return a.some(d => find(b, d));
}


module.exports = permission;
