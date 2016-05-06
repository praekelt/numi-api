const extend = require('lodash/extend');
const { readFileSync: open } = require('fs');
const { safeLoad: load } = require('js-yaml');


function conj(a, b) {
  return extend({}, a, b);
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


module.exports = {
  conj,
  trap,
  read,
  effect
};
