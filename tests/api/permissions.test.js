const { stub, restore } = require('sinon');
const { expect } = require('chai');
const { permissions } = require('src/api');
const { authConf } = require('src/auth-utils');
const auth = require('src/auth');


describe('api.permissions', () => {
  afterEach(() => {
    restore(); });

  describe('create', () => {
    it('should create permissions', () => {
      const expected = {
        id: 22,
        type: 'project:write',
        namespace: '_numi_',
        object_id: 21
      };

      stub(auth.teams, 'addPermission')
        .withArgs(23, {
          type: 'project:write',
          namespace: '_numi_',
          object_id: 21
        }, {
          conf: authConf({
            type: 'token',
            token: 'abc'
          })
        })
        .returns(expected);

      const res = permissions.create(23, {
        type: 'project:write',
        object_id: 21
      }, {
        namespace: '_numi_',
        auth: {
          type: 'token',
          token: 'abc'
        }
      });

      expect(res).to.deep.equal(expected);
    });
  });

  describe('remove', () => {
    it('should throw a NotImplementedError', () => {
      const expected = {
        id: 22,
        type: 'project:write',
        namespace: '_numi_',
        object_id: 21
      };

      stub(auth.teams, 'removePermission')
        .withArgs(23, 21)
        .returns(expected);

      const res = permissions.remove(23, 21, {
        auth: {
          type: 'token',
          token: 'abc'
        }
      });

      expect(res).to.deep.equal(expected);
    });
  });
});
