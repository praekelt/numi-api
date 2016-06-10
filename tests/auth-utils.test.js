const constant = require('lodash/constant');
const { sandbox } = require('sinon');
const { expect } = require('chai');
const { fail } = expect;
const { UnsupportedAuthTypeError } = require('src/errors');
const { authUser, authConf } = require('src/auth-utils');
const authApi = require('src/core/auth');


describe("auth-utils", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("authUser", () => {
    it("should get the user from a token", () => {
      const expected = {id: 23};

      const auth = {
        type: 'token',
        value: '1234'
      };

      this.sandbox.stub(authApi.user, 'get')
        .withArgs({conf: {token: '1234'}})
        .returns(Promise.resolve({data: expected}));

      return authUser(auth)
        .then(res => expect(res).to.deep.equal(expected));
    });


    it("should reject with UnsupportedAuthTypeError for unsupported types",
    () => {
      const auth = {
        type: 'unknown',
        value: null
      };

      this.sandbox.stub(authApi.user, 'get');

      return authUser(auth)
        .then(fail, e => expect(e).to.be.instanceof(UnsupportedAuthTypeError));
    });
  });

  describe("authConf", () => {
    it("should add the token to the config", () => {
      const auth = {
        type: 'token',
        value: '1234'
      };

      expect(authConf(auth))
        .to.deep.equal({token: '1234'});
    });

    it("should throw an UnsupportedAuthTypeError for unsupported types",
    () => {
      const auth = {
        type: 'unknown',
        value: null
      };

      expect(() => authConf(auth))
        .to.throw(UnsupportedAuthTypeError);
    });
  });
});
