const extend = require('lodash/extend');
const { readFileSync: open } = require('fs');
const { safeLoad: load } = require('js-yaml');


function conj(a, b) {
  return extend({}, a, b);
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


exports.conj = conj;
exports.trap = trap;
exports.read = read;
