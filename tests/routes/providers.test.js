const multicb = require('multicb');
const request = require('supertest');
const providers = require('src/core/providers');
const app = require('src');
const tokens = require('tests/fixtures/tokens');
const providerFixtures = require('tests/fixtures/providers');
const { statusToNotEqual } = require('tests/utils');
const { sandbox } = require('sinon');


describe("routes/providers", () => {
  before(() => {
    this.numi = app.listen();
  });

  beforeEach(() => {
    this.sandbox = sandbox.create();
    providerFixtures(this.sandbox, providers);
  });

  afterEach(() => {
    this.sandbox.restore();
  });


  describe("GET /organizations/:id/providers/", () => {
    it("should list the organization's providers");

    it("should check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/organizations/1/providers/')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/organizations/1/providers/')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });
  });

  describe("GET /providers/:id", () => {
    it("check access for teams with org permissions", done => {
      const next = multicb();

      request(this.numi)
        .get('/providers/1')
        .set('Authorization', `Token ${tokens.org2Admin}`)
        .expect(403)
        .end(next());

      request(this.numi)
        .get('/providers/1')
        .set('Authorization', `Token ${tokens.org1Admin}`)
        .expect(statusToNotEqual(403))
        .end(next());

      next(done);
    });

    it("should return the provider description");
  });
});
