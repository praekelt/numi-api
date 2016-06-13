const replay = require('replay');
const { join } = require('path');


replay.reset('localhost');
replay.fixtures = join(__dirname, '.http-fixtures');
