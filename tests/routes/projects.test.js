describe("routes/projects", () => {
  describe("POST /projects/", () => {
    it("should validate the request body");
    it("should allow access for teams with `org:admin`s");
  });

  describe("GET /projects/", () => {
    it("should allow access for teams with `org:admin`s");
    it("should allow access for teams with `project:admin`s");
    it("should allow access for teams with `project:read`s");
    it("should allow access for teams with `project:writes`s");
  });

  describe("GET /projects/:id", () => {
    it("should allow access for teams with `org:admin`s");
    it("should allow access for teams with `project:admin`s");
    it("should allow access for teams with `project:read`s");
    it("should allow access for teams with `project:writes`s");
  });

  describe("GET /projects/:id/teams/", () => {
    it("should allow access for teams with `org:admin`s");
    it("should allow access for teams with `project:admin`s");
    it("should allow access for teams with `project:read`s");
    it("should allow access for teams with `project:writes`s");
  });

  describe("GET /projects/:id/channels/", () => {
    it("should allow access for teams with `org:admin`s");
    it("should allow access for teams with `project:admin`s");
    it("should allow access for teams with `project:read`s");
    it("should allow access for teams with `project:writes`s");
  });

  describe("PUT /projects/:id", () => {
    it("should validate the request body");
    it("should allow access for teams with `org:admin`s");
    it("should allow access for teams with `project:admin`s");
    it("should allow access for teams with `project:writes`s");
  });

  describe("PATCH /projects/:id", () => {
    it("should validate the request body");
    it("should allow access for teams with `org:admin`s");
    it("should allow access for teams with `project:admin`s");
    it("should allow access for teams with `project:writes`s");
  });
});
