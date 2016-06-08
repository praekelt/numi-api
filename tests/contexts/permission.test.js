const { NotImplementedError } = require('src/errors');
const { expect, fail } = require('chai');
const { sandbox } = require('sinon');
const { permission } = require('src/contexts');
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
    it('should throw a NotImplementedError', () => {
      expect(() => permission.removeAccess())
        .to.throw(NotImplementedError);
    });
  });
});
