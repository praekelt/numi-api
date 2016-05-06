const users = require('src/routes/users');
const password = require('src/routes/password');


module.exports = [].concat(...[
  users,
  password
]);
