const chai = require('chai');
const replay = require('replay');
const { join } = require('path');


chai.use(require('chai-shallow-deep-equal'));
replay.reset('localhost');
replay.fixtures = join(__dirname, '.http-fixtures');
