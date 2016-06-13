const { sandbox } = require('sinon');
const { expect } = require('chai');
const { teams } = require('src/api');
const { authConf } = require('src/auth-utils');
const authApi = require('src/auth');


describe('api.teams', () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('list', () => {
    it('should list an organizations teams', () => {
      const auth = {
        type: 'token',
        token: 'abc'
      };

      const expected = [
        {id: 1},
        {id: 2}
      ];

      this.sandbox.stub(authApi.organizations, 'listTeams')
        .withArgs(23, {conf: authConf(auth)})
        .returns(Promise.resolve({data: expected}));

      return teams.list(23, {auth})
        .then(res => expect(res).to.deep.equal(expected));
    });
  });

  describe('get', () => {
    it('should get a team', () => {
      const auth = {
        type: 'token',
        token: 'abc'
      };

      const expected = {id: 21};

      this.sandbox.stub(authApi.teams, 'get')
        .withArgs(21, {conf: authConf(auth)})
        .returns(Promise.resolve({data: expected}));

      return teams.get(21, {auth})
        .then(res => expect(res).to.deep.equal(expected));
    });
  });
});
