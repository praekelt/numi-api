describe("routes/dialogues", () => {
  describe("POST /projects/:project_id/dialogues/", () => {
    it("should create the given dialogue");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });

  describe("GET /projects/:project_id/dialogues/", () => {
    it("should list the given project's dialogues");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });

  describe("GET /dialogues/:id", () => {
    it("should get the dialogue");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });

  describe("PUT /dialogues/:id", () => {
    it("should update the dialogue");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });

  describe("PATCH /dialogues/:id", () => {
    it("should patch the dialogue");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });
});
