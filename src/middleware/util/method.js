const last = require('lodash/last');
const get = require('lodash/get');
const has = require('lodash/has');
const isNull = require('lodash/isNull');
const constant = require('lodash/constant');
const { conj, effect } = require('src/utils');


const {
  AuthenticationRequiredError,
  AuthorizationError
} = require('src/errors');


function method(opts, fn) {
  const isPublic = !has(opts, 'permission');
  const { permission } = conj({permission: constant(true)}, opts);

  return groupArgs((ctx, args, next) => Promise.resolve(ctx)
    .then(getUser)
    .then(effect(user => isPublic || assertAuthentication(user)))
    .then(effect(user => assertAuthorization(user, permission)))
    .then(() => fn(ctx, args, next)));
}


function getUser(ctx) {
  return get(ctx, 'user', null);
}


function assertAuthentication(user) {
  if (isNull(user)) throw new AuthenticationRequiredError();
}


function assertAuthorization(user, permission) {
  return Promise.resolve(user)
    .then(permission)
    .then(granted => { if (!granted) throw new AuthorizationError(); });
}


function groupArgs(fn) {
  return (ctx, ...args) => fn(ctx, args.slice(0, -1), last(args));
}


module.exports = method;
