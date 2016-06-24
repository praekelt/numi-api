const request = require('supertest');
const multicb = require('multicb');
const { omitReadOnly } = require('@praekelt/json-schema-utils');
const { sandbox } = require('sinon');

const app = require('src');
const projects = require('src/core/projects');
const dialogues = require('src/core/dialogues');
const { definitions: { revision: { revision: schema } } } = require('schemas');

const tokens = require('tests/fixtures/tokens');
const projectFixtures = require('tests/fixtures/projects');
const dialogueFixtures = require('tests/fixtures/dialogues');
const { statusToNotEqual } = require('tests/utils');
const { fakeRevision } = require('tests/fakes');


describe("routes/revisions", () => {
  before(() => {
    this.numi = app.listen();
  });

  beforeEach(() => {
    this.sandbox = sandbox.create();
    projectFixtures(this.sandbox, projects);
    dialogueFixtures(this.sandbox, dialogues);
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("POST /dialogues/:dialogue_id/revisions/", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .post('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .post('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should create the given revision");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .post('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .post('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("GET /dialogues/:dialogue_id/revisions/", () => {
    it("should list the dialogue's revisions");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/dialogues/1/revisions/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .send(omitReadOnly(schema, fakeRevision()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });
});
