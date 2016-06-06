const get = require('lodash/get');
const { effect } = require('src/utils');
const method = require('src/middlewares/method');
const { json_patch: patchSchema } = require('schemas').definitions;
const { conj } = require('src/utils');

const {
  omitReadOnly,
  defaults,
  validate
} = require('@praekelt/json-schema-utils');


function create(fn, opts = {}) {
  opts = conj({schema: {}}, opts);
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(effect(d => validate(opts.schema, d)))
    .then(d => defaults(opts.schema, d))
    .then(d => fn(...args, d, getOptions(ctx)))
    .then(res => {
      ctx.status = 201;
      ctx.body = res;
    })
    .then(() => next()));
}


function read(fn, opts = {}) {
  opts = conj({schema: {}}, opts);
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.query)
    .then(effect(d => validate(opts.schema, d)))
    .then(d => defaults(opts.schema, d))
    .then(d => fn(...args, d, getOptions(ctx)))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function update(fn, opts = {}) {
  opts = conj({schema: {}}, opts);
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(d => omitReadOnly(opts.schema, d))
    .then(effect(d => validate(opts.schema, d)))
    .then(d => defaults(opts.schema, d))
    .then(d => fn(...args, d, getOptions(ctx)))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function patch(fn, opts = {}) {
  return method(opts, (ctx, args, next) => Promise.resolve(ctx.request.body)
    .then(effect(d => validate(patchSchema, d)))
    .then(d => fn(...args, d, getOptions(ctx)))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function remove(fn, opts = {}) {
  return method(opts, (ctx, args, next) => Promise.resolve()
    .then(() => fn(...args, getOptions(ctx)))
    .then(res => { ctx.body = res; })
    .then(() => next()));
}


function getOptions(ctx) {
  return {auth: get(ctx, 'auth', null)};
}


module.exports = {
  create,
  read,
  update,
  patch,
  remove
};
