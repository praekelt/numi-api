const { effect } = require('src/utils');
const method = require('src/middlewares/method');
const { json_patch: patchSchema } = require('schemas').definitions;

const {
  omitReadOnly,
  defaults,
  validate
} = require('@praekelt/json-schema-utils');


function create(fn, def = {}) {
  const {schema = {}} = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(res => {
        ctx.status = 201;
        ctx.body = res;
      })
      .then(() => next()));
}


function list(fn, def = {}) {
  const {schema = {}} = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.query)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function read(fn, def = {}) {
  const {schema = {}} = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.query)
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function update(fn, def = {}) {
  const {schema = {}} = def;

  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(d => omitReadOnly(schema, d))
      .then(effect(d => validate(schema, d)))
      .then(d => defaults(schema, d))
      .then(d => fn(...args, d, opts))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function patch(fn, def = {}) {
  return method(def, (ctx, args, opts, next) =>
    Promise.resolve(ctx.request.body)
      .then(effect(d => validate(patchSchema, d)))
      .then(d => fn(...args, d, opts))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


function remove(fn, def = {}) {
  return method(def, (ctx, args, opts, next) =>
    Promise.resolve()
      .then(() => fn(...args, opts))
      .then(res => { ctx.body = res; })
      .then(() => next()));
}


module.exports = {
  create,
  read,
  list,
  update,
  patch,
  remove
};
