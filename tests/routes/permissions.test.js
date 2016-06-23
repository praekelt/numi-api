const multicb = require('multicb');
const request = require('supertest');
const { omitReadOnly } = require('@praekelt/json-schema-utils');
const { sandbox } = require('sinon');

const app = require('src');
const {
  definitions: { permission: { permission: schema } }
} = require('schemas');
const projects = require('src/core/projects');

const tokens = require('tests/fixtures/tokens');
const projectFixtures = require('tests/fixtures/projects');
const { fakePermission } = require('tests/fakes');
const { statusToNotEqual } = require('tests/utils');


describe("routes/permissions", () => {
  before(() => {
    this.numi = app.listen();
  });

  beforeEach(() => {
    this.sandbox = sandbox.create();
    projectFixtures(this.sandbox, projects);
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("POST /teams/:teamId/permissions/", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(omitReadOnly(schema, fakePermission()))
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should add the permission", done => {
      const permission = fakePermission({
        object_id: '3',
        type: 'project:admin'
      });

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(omitReadOnly(schema, permission))
        .expect(201)
        .expect(permission)
        .end(done);
    });

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      const permission = fakePermission({
        object_id: '3',
        type: 'project:admin'
      });

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(omitReadOnly(schema, permission))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(omitReadOnly(schema, permission))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      const permission = fakePermission({
        object_id: '3',
        type: 'project:admin'
      });

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.project4Admin}`)
        .send(omitReadOnly(schema, permission))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/teams/9/permissions/')
        .set('Authorization', `Token ${tokens.project3Admin}`)
        .send(omitReadOnly(schema, permission))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("DELETE /teams/:teamId/permissions/:id", () => {
    it("should delete the permission", done => {
      request(this.numi)
        .delete('/teams/9/permissions/11')
        .set('Authorization', `Token ${tokens.admin}`)
        .expect(204)
        .end(done);
    });

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .delete('/teams/9/permissions/11')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .delete('/teams/9/permissions/11')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .delete('/teams/9/permissions/11')
        .set('Authorization', `Token ${tokens.project4Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .delete('/teams/9/permissions/11')
        .set('Authorization', `Token ${tokens.project3Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });
});
