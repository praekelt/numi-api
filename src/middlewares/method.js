const last = require('lodash/last');
const get = require('lodash/get');
const isNull = require('lodash/isNull');
const { ensure, effect, castFunction } = require('src/utils');


const {
  AuthenticationRequiredError,
  AuthorizationError
} = require('src/errors');


function method(opts, fn) {
  const {access: access = null} = ensure(opts || {});

  return groupArgs((ctx, args, next) => Promise.resolve(ctx)
    .then(getUser)
    .then(effect(user => { if (!isNull(access)) assertAuthentication(user); }))
    .then(effect(user => assertAccess(user, access, args)))
    .then(() => fn(ctx, args, next)));
}


function getUser(ctx) {
  return get(ctx, 'user', null);
}


function assertAuthentication(user) {
  if (isNull(user)) throw new AuthenticationRequiredError();
}


function assertAccess(user, access, args) {
  let {
    context: context = null,
    permission: permission = true
  } = ensure(access, {});

  context = castFunction(context);
  permission = castFunction(permission);

  return Promise.resolve()
    .then(() => context(...args))
    .then(ctx => permission(ctx, user))
    .then(granted => { if (!granted) throw new AuthorizationError(); });
}


function groupArgs(fn) {
  return (ctx, ...args) => fn(ctx, args.slice(0, -1), last(args));
}


module.exports = method;
