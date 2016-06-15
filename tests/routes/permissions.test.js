const app = require('src');


describe("routes/permissions", () => {
  before(() => {
    this.numi = app.listen();
  });

  describe("POST /teams/:teamId/permissions/", () => {
    it("should validate the request body");
    it("should add the permission");
    it("should check org permissions related to the permission");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });

  describe("DELETE /teams/:teamId/permissions/:id", () => {
    it("should delete the permission");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });
});
