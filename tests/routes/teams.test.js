const app = require('src');


describe("routes/teams", () => {
  before(() => {
    this.numi = app.listen();
  });

  describe("GET /organizations/:orgId/teams/", () => {
    it("should retrieve the organization's teams");
    it("should only be accessible to authenticated users");
  });

  describe("GET /teams/:id", () => {
    it("should retrieve the team's description");
    it("should only be accessible to authenticated users");
  });
});
