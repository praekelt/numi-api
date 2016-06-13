const { conj } = require('src/utils');
const auth = require('@praekelt/seed-auth');

const {
  SeedAuthUnauthorizedError: AuthUnauthorizedError,
  SeedAuthForbiddenError: AuthForbiddenError,
  SeedAuthNotFoundError: AuthNotFoundError,
  SeedAuthResponseError: AuthResponseError
} = auth;


module.exports = conj(auth, {
  AuthUnauthorizedError,
  AuthForbiddenError,
  AuthNotFoundError,
  AuthResponseError
});
