const { expect } = require('chai');
const { fail } = expect;
const { UnsupportedAuthTypeError } = require('src/errors');
const authUser = require('src/core/auth-user');


describe('authUser', () => {
  it("should get the user from a token", () => {
    const auth = {
      user: {
        get: ({conf: {token: token}}) => ({fakeToken: 'fake-user'}[token])
      }
    };

    expect(authUser({auth})({
        type: 'token',
        value: 'fakeToken'
      }))
      .to.equal('fake-user');
  });


  it("should reject with UnsupportedAuthTypeError for unsupported types", () => {
    return authUser({auth: {}})({
        type: 'unknown',
        value: null
      })
      .then(fail, e => expect(e).to.be.instanceof(UnsupportedAuthTypeError));
  });
});
