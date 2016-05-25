const last = require('lodash/last');
const { conj, effect } = require('src/utils');
const { json_patch: patchSchema } = require('schemas').definitions;
const {
  omitReadOnly,
  defaults,
  validate
} = require('@praekelt/json-schema-utils');

function create(schema, fn) {
  return method((ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(effect(d => validate(schema, d)))
    .then(d => defaults(schema, d))
    .then(d => fn(...args, d))
    .then(res => {
      ctx.status = 201;
      ctx.body = res;
    })
    .then(() => next()));
}


function read(fn, defaults = () => ({})) {
  return method((ctx, args, next) => Promise.resolve(ctx.request.query)
    .then(d => conj(defaults(), d))
    .then(d => fn(...args, d))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function update(schema, fn) {
  return method((ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(d => omitReadOnly(schema, d))
    .then(effect(d => validate(schema, d)))
    .then(d => defaults(schema, d))
    .then(d => fn(...args, d))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function patch(fn) {
  return method((ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(effect(d => validate(patchSchema, d)))
    .then(d => fn(...args, d))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function remove(fn) {
  return method((ctx, args, next) => Promise.resolve()
    .then(() => fn(...args))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function method(fn) {
  return (ctx, ...args) => fn(ctx, args.slice(0, -1), last(args));
}


module.exports = {
  create,
  read,
  update,
  patch,
  remove
};
