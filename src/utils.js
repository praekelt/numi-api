const extend = require('lodash/extend');
const isNull = require('lodash/isNull');
const isFunction = require('lodash/isFunction');
const isUndefined = require('lodash/isUndefined');
const constant = require('lodash/constant');
const { readFileSync: open } = require('fs');
const { safeLoad: load } = require('js-yaml');
const { Multiline: str } = require('multiline-tag');


function conj(...args) {
  return extend({}, ...args);
}


function ensure(v, defaultVal) {
  return isNull(v) || isUndefined(v)
    ? defaultVal
    : v;
}


function effect(fn) {
  return (v) => Promise.resolve(v)
    .then(fn)
    .then(() => v);
}


function trap(type, fn) {
  return e => {
    if (e instanceof type) return fn(e);
    else throw e;
  };
}


function read(filename) {
  return load(open(filename));
}


function castFunction(v) {
  return !isFunction(v)
    ? constant(v)
    : v;
}


module.exports = {
  conj,
  ensure,
  trap,
  read,
  effect,
  str,
  castFunction
};
