const request = require('supertest');
const multicb = require('multicb');
const { omitReadOnly } = require('@praekelt/json-schema-utils');
const { sandbox } = require('sinon');

const app = require('src');
const projects = require('src/core/projects');
const dialogues = require('src/core/dialogues');
const { definitions: { dialogue: { dialogue: schema } } } = require('schemas');

const tokens = require('tests/fixtures/tokens');
const dialogueFixtures = require('tests/fixtures/dialogues');
const projectFixtures = require('tests/fixtures/projects');
const { statusToNotEqual } = require('tests/utils');
const { fakeDialogue } = require('tests/fakes');


describe.only("routes/dialogues", () => {
  before(() => {
    this.numi = app.listen();
  });

  beforeEach(() => {
    this.sandbox = sandbox.create();
    dialogueFixtures(this.sandbox, dialogues);
    projectFixtures(this.sandbox, projects);
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("POST /projects/:project_id/dialogues/", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .post('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .post('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(omitReadOnly(schema, fakeDialogue()))
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should create the given dialogue");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .post('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(omitReadOnly(schema, fakeDialogue()))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(omitReadOnly(schema, fakeDialogue()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .post('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .send(omitReadOnly(schema, fakeDialogue()))
        .expect(403)
        .end(next());

      request(this.numi)
        .post('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .send(omitReadOnly(schema, fakeDialogue()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("GET /projects/:project_id/dialogues/", () => {
    it("should list the given project's dialogues");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("GET /dialogues/:id", () => {
    it("should get the dialogue");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/dialogues/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/dialogues/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/dialogues/1')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/projects/1/dialogues/')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("PUT /dialogues/:id", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .put('/dialogues/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .put('/dialogues/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(fakeDialogue())
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should update the dialogue");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .put('/dialogues/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(fakeDialogue())
        .expect(403)
        .end(next());

      request(this.numi)
        .put('/dialogues/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(fakeDialogue())
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .put('/dialogues/1')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .send(fakeDialogue())
        .expect(403)
        .end(next());

      request(this.numi)
        .put('/dialogues/1')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .send(omitReadOnly(schema, fakeDialogue()))
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("PATCH /dialogues/:id", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .patch('/dialogues/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .patch('/dialogues/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send([])
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should patch the dialogue");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .patch('/dialogues/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send([])
        .expect(403)
        .end(next());

      request(this.numi)
        .patch('/dialogues/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send([])
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should check access for teams with project permissions", done => {
      const next = multicb();

      request(this.numi)
        .patch('/dialogues/1')
        .set('Authorization', `Token ${tokens.project2Admin}`)
        .send([])
        .expect(403)
        .end(next());

      request(this.numi)
        .patch('/dialogues/1')
        .set('Authorization', `Token ${tokens.project1Admin}`)
        .send([])
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });
});
