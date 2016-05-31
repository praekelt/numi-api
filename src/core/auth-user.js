const coreAuth = require('src/core/auth');
const { UnsupportedAuthTypeError } = require('src/errors');


function authUser({auth = coreAuth} = {}) {
  return ({
    type,
    value: token
  }) => {
    switch (type) {
      case 'token':
        return fromToken(auth, token);

      default:
        return Promise.reject(new UnsupportedAuthTypeError(type));
    }
  };
}


function fromToken(auth, token) {
  return auth.user.get({conf: {token}});
}


module.exports = authUser;
