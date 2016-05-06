const user = require('src/routes/user');
const users = require('src/routes/users');
const password = require('src/routes/password');


module.exports = [].concat(...[
  user,
  users,
  password
]);
