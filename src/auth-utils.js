const authApi = require('src/auth');
const { UnsupportedAuthTypeError } = require('src/errors');


function authUser(auth, api = authApi) {
  return Promise.resolve(auth)
    .then(getConf)
    .then(conf => api.user.get({conf}))
    .then(d => d.data);
}


function getConf(auth) {
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
  getConf
};