const extend = require('lodash/extend');
const open = require('fs').readFileSync;
const load = require('js-yaml').safeLoad;


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
  return load(open(filename).toString());
}


exports.conj = conj;
exports.trap = trap;
exports.read = read;
