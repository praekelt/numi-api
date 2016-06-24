const multicb = require('multicb');
const request = require('supertest');
const { sandbox } = require('sinon');

const app = require('src');
const channels = require('src/core/channels');
const providers = require('src/core/providers');
const { definitions: { channel: { channel: schema } } } = require('schemas');

const tokens = require('tests/fixtures/tokens');
const providerFixtures = require('tests/fixtures/providers');
const channelFixtures = require('tests/fixtures/channels');
const { statusToNotEqual } = require('tests/utils');
const { fakeChannel } = require('tests/fakes');


describe("routes/channels", () => {
  before(() => {
    this.numi = app.listen();
  });

  beforeEach(() => {
    this.sandbox = sandbox.create();
    providerFixtures(this.sandbox, providers);
    channelFixtures(this.sandbox, channels);
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe("GET /channels/:id", () => {
    it("should return the channel description");

    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/channels/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/channels/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("PUT /channels/:id", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .put('/channels/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .put('/channels/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send(fakeChannel())
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should return the channel description");

    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .put('/channels/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send(fakeChannel())
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/channels/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send(schema, fakeChannel())
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("PATCH /channels/:id", () => {
    it("should validate the request body", done => {
      const next = multicb();

      request(this.numi)
        .patch('/channels/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send({})
        .expect(422)
        .end(next());

      request(this.numi)
        .patch('/channels/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .send([])
        .expect(statusToNotEqual(422))
        .end(next());

      next(done);
    });

    it("should return the channel description");

    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .patch('/channels/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .send([])
        .expect(403)
        .end(next());

      request(this.numi)
        .patch('/channels/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .send([])
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });
});
