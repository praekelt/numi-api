const map = require('lodash/map');
const get = require('lodash/get');
const isNull = require('lodash/isNull');
const Promise = require('bluebird');
const method = require('src/middlewares/method');
const { json_patch: patchSchema } = require('schemas').definitions;
const { conj, ensure, effect, castFunction } = require('src/utils');

const {
  omitReadOnly,
  defaults,
  validate
} = require('@praekelt/json-schema-utils');

const {
  AuthenticationRequiredError
} = require('src/errors');


function create(fn, def = {}) {
  const {
    schema = {},
    url = null
  } = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(d => withUrl(d, url))
      .then(res => {
        ctx.status = 201;
        ctx.body = res;
      })
      .then(() => next()));
}


function list(fn, def = {}) {
  const {
    schema = {},
    url = null,
    visibility = null
  } = def;

  return method(def, (ctx, args, opts, next) => {
    const user = getUser(ctx);
    if (!isNull(visibility)) assertAuthentication(user);

    return Promise.resolve(ctx.request.query)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(data => filterVisible(user, visibility, data, opts))
      .then(data => map(data, d => withUrl(d, url)))
      .then(res => { ctx.body = res; })
      .then(() => next());
  });
}


function read(fn, def = {}) {
  const {
    schema = {},
    url = null
  } = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.query)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(d => withUrl(d, url))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function update(fn, def = {}) {
  const {
    schema = {},
    url = null
  } = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(d => omitReadOnly(schema, d))
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(d => withUrl(d, url))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function patch(fn, def = {}) {
  const {url = null} = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(effect(d => validate(patchSchema, d)))
      .then(d => fn(...args, d, opts))
      .then(d => withUrl(d, url))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function remove(fn, def = {}) {
  const {url = null} = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve()
      .then(() => fn(...args, opts))
      .then(d => withUrl(d, url))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function filterVisible(user, visibility, data, opts) {
  let {
    context = null,
    permission = true
  } = ensure(visibility, {});

  context = castFunction(context);
  permission = castFunction(permission);

  return Promise.filter(data, d => Promise.resolve()
    .then(() => context(d, opts))
    .then(ctx => permission(ctx, user)), {concurrency: 1});
}


function getUser(ctx) {
  return get(ctx, 'user', null);
}


function withUrl(d, urlFn) {
  return !isNull(urlFn)
    ? conj(d, {url: urlFn(d)})
    : d;
}


function assertAuthentication(user) {
  if (isNull(user)) throw new AuthenticationRequiredError();
}


module.exports = {
  create,
  read,
  list,
  update,
  patch,
  remove
};
