const extend = require('lodash/extend');
const open = require('fs').readFileSync;
const load = require('js-yaml').safeLoad;


function conj(a, b) {
  return extend({}, a, b);
}


function read(filename) {
  return load(open(filename).toString());
}


exports.read = read;
exports.conj = conj;
