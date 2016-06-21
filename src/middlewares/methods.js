const last = require('lodash/last');
const get = require('lodash/get');
const isNull = require('lodash/isNull');
const map = require('lodash/map');
const identity = require('lodash/identity');
const Promise = require('bluebird');
const {
  omitReadOnly,
  defaults,
  validate
} = require('@praekelt/json-schema-utils');

const { definitions: { json_patch: patchSchema } } = require('schemas');
const { conj, ensure, effect, castFunction } = require('src/utils');
const {
  AuthenticationRequiredError,
  AuthorizationError
} = require('src/errors');


function create(fn, def = {}) {
  const {
    schema = {},
    access = null,
    serializer = identity
  } = def;

  return method((ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(effect(d => assertAccess(ctx, access, ...args, d, opts)))
      .then(d => fn(...args, d, opts))
      .then(serializer)
      .then(setResponse(ctx, 201))
      .then(() => next()));
}


function list(fn, def = {}) {
  const {
    schema = {},
    access = null,
    visibility = null,
    serializer = identity
  } = def;

  return method((ctx, args, opts, next) =>
    Promise.resolve(ctx.request.query)
      .then(effect(params => validate(schema, params)))
      .then(params => defaults(schema, params))
      .then(params => conj(opts, {params}))
      .then(effect(opts => assertAccess(ctx, access, ...args, opts)))
      .then(opts => fn(...args, opts))
      .then(data => filterVisible(ctx, visibility, data, opts))
      .then(data => map(data, serializer))
      .then(setResponse(ctx))
      .then(() => next()));
}


function read(fn, def = {}) {
  const {
    schema = {},
    access = null,
    serializer = identity
  } = def;

  return method((ctx, args, opts, next) =>
    Promise.resolve(ctx.request.query)
      .then(effect(params => validate(schema, params)))
      .then(params => defaults(schema, params))
      .then(params => conj(opts, {params}))
      .then(effect(opts => assertAccess(ctx, access, ...args, opts)))
      .then(opts => fn(...args, opts))
      .then(serializer)
      .then(setResponse(ctx))
      .then(() => next()));
}


function update(fn, def = {}) {
  const {
    schema = {},
    access = null,
    serializer = identity
  } = def;

  return method((ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(d => omitReadOnly(schema, d))
      .then(effect(d => validate(schema, d)))
      .then(effect(d => assertAccess(ctx, access, ...args, d, opts)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(serializer)
      .then(setResponse(ctx))
      .then(() => next()));
}


function patch(fn, def = {}) {
  const {
    access = null,
    serializer = identity
  } = def;

  return method((ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(effect(d => validate(patchSchema, d)))
      .then(effect(d => assertAccess(ctx, access, ...args, d, opts)))
      .then(d => fn(...args, d, opts))
      .then(serializer)
      .then(setResponse(ctx))
      .then(() => next()));
}


function remove(fn, def = {}) {
  const {
    access = null,
    serializer = identity
  } = def;

  return method((ctx, args, opts, next) => Promise.resolve()
      .then(effect(() => assertAccess(ctx, access, ...args, opts)))
      .then(() => fn(...args, opts))
      .then(serializer)
      .then(setResponse(ctx))
      .then(() => next()));
}


function method(fn) {
  return groupArgs((ctx, args, next) => fn(ctx, args, getOptions(ctx), next));
}


function setResponse(ctx, status = 200) {
  return res => {
    if (isNull(res)) {
      ctx.status = 204;
      ctx.body = '';
    }
    else {
      ctx.status = status;
      ctx.body = res;
    }
  };
}


function getUser(ctx) {
  return get(ctx, 'user', null);
}


function groupArgs(fn) {
  return (ctx, ...args) => fn(ctx, args.slice(0, -1), last(args));
}


function getOptions(ctx) {
  return {auth: get(ctx, 'auth', null)};
}


function permissionMethod(fn) {
  return (ctx, def, v, ...args) => isNull(def)
    ? Promise.resolve(v)
    : Promise.resolve(ctx)
      .then(getUser)
      .then(effect(assertAuthentication))
      .then(user => fn(user, def, v, ...args));
}


function assertAuthentication(user) {
  if (isNull(user)) throw new AuthenticationRequiredError();
}


const assertAccess = permissionMethod((user, access, ...args) => {
  let {
    context = null,
    permission = true
  } = ensure(access, {});

  context = castFunction(context);
  permission = castFunction(permission);

  return Promise.resolve()
    .then(() => context(...args))
    .then(ctx => permission(ctx, user))
    .then(granted => { if (!granted) throw new AuthorizationError(); });
});


const filterVisible = permissionMethod((user, visibility, data, opts) => {
  let {
    context = null,
    permission = true
  } = ensure(visibility, {});

  context = castFunction(context);
  permission = castFunction(permission);

  return Promise.filter(data, d => Promise.resolve()
    .then(() => context(d, opts))
    .then(ctx => permission(ctx, user)), {concurrency: 1});
});


module.exports = {
  create,
  read,
  list,
  update,
  patch,
  remove
};
