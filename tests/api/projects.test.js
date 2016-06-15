const { expect } = require('chai');
const { sandbox } = require('sinon');
const { projects } = require('src/api');
const { NotImplementedError } = require('src/errors');
const { authConf } = require('src/auth-utils');
const { authResult } = require('tests/fakes');
const authApi = require('src/core/auth');


describe("api.projects", () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("create", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.create())
        .to.throw(NotImplementedError);
    });
  });

  describe("list", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.list())
        .to.throw(NotImplementedError);
    });
  });

  describe("get", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.get())
        .to.throw(NotImplementedError);
    });
  });

  describe("listTeams", () => {
    it("should list teams related to a project", () => {
      const expected = [
        {id: 1},
        {id: 2}
      ];

      const auth = {
        type: 'token',
        token: 'abc'
      };

      this.sandbox.stub(authApi.teams, 'list')
        .withArgs({
          namespace: '_numi_',
          conf: authConf(auth),
          permission_contains: 'project:',
          object_id: 23
        })
        .returns(authResult(expected));

      return projects.listTeams(23, {
          auth,
          namespace: '_numi_'
        })
        .then(res => expect(res).to.deep.equal(expected));
    });
  });

  describe("listChannels", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.listChannels())
        .to.throw(NotImplementedError);
    });
  });

  describe("update", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.update())
        .to.throw(NotImplementedError);
    });
  });

  describe("patch", () => {
    it("should throw a NotImplementedError", () => {
      expect(() => projects.patch())
        .to.throw(NotImplementedError);
    });
  });
});
