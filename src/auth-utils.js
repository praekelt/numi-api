const authApi = require('src/core/auth');
const { UnsupportedAuthTypeError } = require('src/errors');


function authUser(auth) {
  return Promise.resolve(auth)
    .then(authConf)
    .then(conf => authApi.user.get({conf}))
    .then(d => d.data);
}


function authConf(auth) {
  const {
    type,
    value: token
  } = auth;

  switch (type) {
    case 'token':
      return {token};

    default:
      throw new UnsupportedAuthTypeError(type);
  }
}


module.exports = {
  authUser,
  authConf
};
