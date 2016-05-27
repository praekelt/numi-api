const last = require('lodash/last');
const { conj, effect } = require('src/utils');
const { json_patch: patchSchema } = require('schemas').definitions;
const {
  omitReadOnly,
  defaults,
  validate
} = require('@praekelt/json-schema-utils');


function create(fn, opts = {schema: {}}) {
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(effect(d => validate(opts.schema, d)))
    .then(d => defaults(opts.schema, d))
    .then(d => fn(...args, d))
    .then(res => {
      ctx.status = 201;
      ctx.body = res;
    })
    .then(() => next()));
}


function read(fn, opts = {defaults: () => ({})}) {
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.query)
    .then(d => conj(opts.defaults(), d))
    .then(d => fn(...args, d))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function update(fn, opts = {schema: {}}) {
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(d => omitReadOnly(opts.schema, d))
    .then(effect(d => validate(opts.schema, d)))
    .then(d => defaults(opts.schema, d))
    .then(d => fn(...args, d))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function patch(fn, opts = {}) {
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(effect(d => validate(patchSchema, d)))
    .then(d => fn(...args, d))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function remove(fn, opts = {}) {
  return method(opts, (ctx, args, next) => Promise.resolve()
    .then(() => fn(...args))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function method(opts, fn) {
  return (ctx, ...args) => fn(ctx, args.slice(0, -1), last(args));
}


module.exports = {
  create,
  read,
  update,
  patch,
  remove
};
