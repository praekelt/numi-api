const { expect } = require('chai');
const serializers = require('src/serializers');


describe("serializers", () => {
  describe("project", () => {
    it("should construct the project's url", () => {
      expect(serializers.project({id: 23}).url).to.equal('/projects/23');
    });
  });

  describe("dialogue", () => {
    it("should construct the dialogue's url", () => {
      expect(serializers.dialogue({id: 23}).url).to.equal('/dialogues/23');
    });
  });

  describe("channel", () => {
    it("should construct the channel's url", () => {
      expect(serializers.channel({id: 23}).url).to.equal('/channels/23');
    });
  });

  describe("provider", () => {
    it("should construct the provider's url", () => {
      expect(serializers.provider({id: 23}).url).to.equal('/providers/23');
    });
  });

  describe("team", () => {
    it("should construct the team's url", () => {
      expect(serializers.team({id: 23}).url).to.equal('/teams/23');
    });
  });
});
