const { NotImplementedError } = require('src/errors');
const { expect, fail } = require('chai');
const { sandbox } = require('sinon');
const { permission } = require('src/contexts');
const { authConf } = require('src/auth-utils');
const authApi = require('src/auth');
const projects = require('src/projects');


describe('contexts.permission', () => {
  beforeEach(() => {
    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });


  describe('createAccess', () => {
    it('should get the contexts for project permission types', () => {
      const expected = {
        projectId: 23,
        organizationId: 21
      };

      this.sandbox.stub(projects, 'get')
        .withArgs(23)
        .returns(Promise.resolve({
          id: 23,
          organization_id: 21
        }));

        return Promise.all([
            'project:admin',
            'project:read',
            'project:write'
          ].map(type => permission.createAccess(7, {
            type,
            object_id: 23
          })))
          .then(res => expect(res).to.deep.equal([
            expected,
            expected,
            expected
          ]));
    });

    it('should reject with NotImplementedError for unsupported types', () => {
      return permission.createAccess(7, {
          type: 'unsupported',
          object_id: 23
        })
        .then(fail, e => expect(e).to.be.instanceof(NotImplementedError));
    });
  });

  describe('removeAccess', () => {
    it('should get the contexts for project permission types', () => {
      const expected = {
        projectId: 23,
        organizationId: 21
      };

      const auth = {
        type: 'token',
        token: 'abc'
      };

      this.sandbox.stub(projects, 'get')
        .withArgs(23)
        .returns(Promise.resolve({
          id: 23,
          organization_id: 21
        }));

      this.sandbox.stub(authApi.teams, 'get')
        .withArgs(7, {conf: authConf(auth)})
        .returns(Promise.resolve({
          permissions: [{
            id: 1,
            type: 'project:admin',
            object_id: 23
          }, {
            id: 2,
            type: 'project:read',
            object_id: 23
          }, {
            id: 3,
            type: 'project:write',
            object_id: 23
          }]
        }));

        return Promise.all([1, 2, 3]
          .map(id => permission.removeAccess(7, id, {auth})))
          .then(res => expect(res).to.deep.equal([
            expected,
            expected,
            expected
          ]));
    });

    it('should throw a NotImplementedError for unsupported permission types',
    () => {
      const auth = {
        type: 'token',
        token: 'abc'
      };

      this.sandbox.stub(projects, 'get')
        .withArgs(23)
        .returns(Promise.resolve({
          id: 23,
          organization_id: 21
        }));

      this.sandbox.stub(authApi.teams, 'get')
        .withArgs(7, {conf: authConf(auth)})
        .returns(Promise.resolve({
          permissions: [{
            id: 1,
            type: 'unsupported',
            object_id: 23
          }]
        }));

        return permission.removeAccess(7, 1, {auth})
          .then(fail, e => expect(e).to.be.instanceof(NotImplementedError));
    });
  });
});
