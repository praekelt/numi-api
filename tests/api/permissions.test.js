const { sandbox } = require('sinon');
const { expect } = require('chai');
const { permissions } = require('src/api');
const { authConf } = require('src/auth-utils');
const { authResult } = require('tests/fakes');
const authApi = require('src/core/auth');


describe("api.permissions", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("create", () => {
    it("should create the given permission", () => {
      const expected = {
        id: 22,
        type: 'project:write',
        namespace: '_numi_',
        object_id: 21
      };

      const auth = {
        type: 'token',
        token: 'abc'
      };

      this.sandbox.stub(authApi.teams, 'addPermission')
        .withArgs(23, {
          type: 'project:write',
          namespace: '_numi_',
          object_id: 21
        }, {
          conf: authConf(auth)
        })
        .returns(authResult(expected));

      return permissions.create(23, {
          type: 'project:write',
          object_id: 21
        }, {
          namespace: '_numi_',
          auth
        })
        .then(res => expect(res).to.deep.equal(expected));
    });
  });

  describe("remove", () => {
    it("should remove the given permission", () => {
      const expected = {
        id: 22,
        type: 'project:write',
        namespace: '_numi_',
        object_id: 21
      };

      const auth = {
        type: 'token',
        token: 'abc'
      };

      this.sandbox.stub(authApi.teams, 'removePermission')
        .withArgs(23, 21, {conf: authConf(auth)})
        .returns(authResult(expected));

      return permissions.remove(23, 21, {auth})
        .then(res => expect(res).to.deep.equal(expected));
    });
  });
});
