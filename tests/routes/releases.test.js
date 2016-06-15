describe("routes/releases", () => {
  describe("POST /dialogues/:dialogue_id/releases", () => {
    it("should validate the request body");
    it("should create the given release");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });

  describe("GET /dialogues/:dialogue_id/releases/", () => {
    it("should list the dialogue's releases");
    it("should check access for teams with org permissions");
    it("should check access for teams with project permissions");
  });
});
