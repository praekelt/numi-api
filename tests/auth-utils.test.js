const constant = require('lodash/constant');
const { expect } = require('chai');
const { fail } = expect;
const { UnsupportedAuthTypeError } = require('src/errors');
const { authUser, authConf } = require('src/auth-utils');


describe('core/auth-utils', () => {
  describe("authUser", () => {
    it("should get the user from a token", () => {
      const auth = {
        user: {
          get: ({conf: {token: token}}) => Promise.resolve({
            fakeToken: {data: 'fake-user'}
          }[token])
        }
      };

      return authUser({
          type: 'token',
          value: 'fakeToken'
        }, auth)
        .then(res => expect(res).to.equal('fake-user'));
    });


    it("should reject with UnsupportedAuthTypeError for unsupported types",
    () => {
      const auth = {
        user: {
          get: constant(Promise.resolve('fake-user'))
        }
      };

      return authUser({
          type: 'unknown',
          value: null
        }, auth)
        .then(fail, e => expect(e).to.be.instanceof(UnsupportedAuthTypeError));
    });
  });

  describe("authConf", () => {
    it("should add the token to the config", () => {
      expect(authConf({
          type: 'token',
          value: 'fakeToken'
        }))
        .to.deep.equal({token: 'fakeToken'});
    });

    it("should throw an UnsupportedAuthTypeError for unsupported types",
    () => {
      expect(() => authConf({
          type: 'unknown',
          value: null
        }))
        .to.throw(UnsupportedAuthTypeError);
    });
  });
});
