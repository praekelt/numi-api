const multicb = require('multicb');
const request = require('supertest');
const { expect } = require('chai');

const app = require('src');
const tokens = require('tests/fixtures/tokens');
const { statusToNotEqual } = require('tests/utils');


describe("routes/teams", () => {
  before(() => {
    this.numi = app.listen();
  });

  describe("GET /organizations/:orgId/teams/", () => {
    it("should retrieve the organization's teams", done => {
      request(this.numi)
        .get('/organizations/1/teams/')
        .set('Authorization', `Token ${tokens.admin}`)
        .expect(200)
        .expect(({body}) => {
          expect(body).to.shallowDeepEqual([{
            url: '/teams/1',
            title: 'Org 1 Admins'
          }, {
            url: '/teams/3',
            title: 'Project 1 Admins'
          }, {
            url: '/teams/4',
            title: 'Project 2 Admins'
          }, {
            url: '/teams/5',
            title: 'Project 1 Readers'
          }, {
            url: '/teams/6',
            title: 'Project 2 Readers'
          }, {
            url: '/teams/7',
            title: 'Project 1 Writers'
          }, {
            url: '/teams/8',
            title: 'Project 2 Writers'
          }]);
        })
        .end(done);
    });

    it("should only be accessible to authenticated users", done => {
      const next = multicb();

      request(this.numi)
        .get('/organizations/1/teams/')
        .expect(401)
        .end(next());

      request(this.numi)
        .get('/organizations/1/teams/')
        .set('Authorization', `Token ${tokens.admin}`)
        .expect(statusToNotEqual(401))
        .end(next());

      next(done);
    });
  });

  describe("GET /teams/:id", () => {
    it("should retrieve the team's description", done => {
      request(this.numi)
        .get('/teams/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .expect(200)
        .expect(({body}) => {
          expect(body).to.shallowDeepEqual({
            url: '/teams/1',
            title: 'Org 1 Admins'
          });
        })
        .end(done);
    });

    it("should only be accessible to authenticated users", done => {
      const next = multicb();

      request(this.numi)
        .get('/teams/1')
        .expect(401)
        .end(next());

      request(this.numi)
        .get('/teams/1')
        .set('Authorization', `Token ${tokens.admin}`)
        .expect(statusToNotEqual(401))
        .end(next());

      next(done);
    });
  });
});
