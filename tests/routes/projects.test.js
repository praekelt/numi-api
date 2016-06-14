const multicb = require('multicb');
const request = require('supertest');
const projects = require('src/core/projects');
const app = require('src');
const tokens = require('tests/fixtures/tokens');
const projectFixtures = require('tests/fixtures/projects');
const { statusToNotEqual } = require('tests/utils');
const { fakeProject } = require('tests/fakes');
const { omitReadOnly } = require('@praekelt/json-schema-utils');
const { sandbox } = require('sinon');
const { definitions: { project: { project: schema } } } = require('schemas');
const { expect } = require('chai');


describe("routes/projects", () => {
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

  describe("POST /organizations/21/projects/", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .post('/organizations/21/projects/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .post('/organizations/21/projects/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(omitReadOnly(schema, fakeProject()))
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .post('/organizations/1/projects/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(omitReadOnly(schema, fakeProject()))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/organizations/1/projects/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(omitReadOnly(schema, fakeProject()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("GET /projects/", () => {
    it("should only show projects visible to the user");
  });

  describe("GET /projects/:id", () => {
    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("GET /projects/:id/teams/", () => {
    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1/teams/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/teams/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1/teams/')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/teams/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should retrieve the teams associated to the project", done => {
      request(this.numi)
        .get('/projects/1/teams/')
        .set('Authorization', `Token ${tokens.admin}`)
        .expect(200)
        .expect(resp => {
          expect(resp.body).to.shallowDeepEqual([
            {title: 'Project 1 Admins'},
            {title: 'Project 1 Readers'},
            {title: 'Project 1 Writers'}
          ]);
        })
        .end(done);
    });
  });

  describe("GET /projects/:id/channels/", () => {
    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1/channels/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/channels/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1/channels/')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/channels/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("PUT /projects/:id", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .put('/projects/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .put('/projects/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(fakeProject())
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .put('/projects/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(fakeProject())
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(fakeProject())
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .put('/projects/1')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .send(fakeProject())
        .expect(403)
        .end(next());

      request(this.numi)
        .put('/projects/1')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .send(fakeProject())
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("PATCH /projects/:id", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .patch('/projects/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send({})
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send([])
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .patch('/projects/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send([])
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send([])
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });
});
