'use strict';
const expect = require('chai').expect;
const utils = require('src/utils');


describe("utils", () => {
  describe("conj", () => {
    it("should conjoin the given objects", () => {
      expect(utils.conj({
        a: 23,
        b: 2
      }, {
        a: 21,
        c: 3
      }))
      .to.deep.equal({
        a: 21,
        b: 2,
        c: 3
      });
    });
  });

  describe("trap", () => {
    it("should handle errors of the given type", () => {
      class FooError extends Error {}
      class BarError extends FooError {}
      const trapped = [];

      const e1 = new FooError();
      const e2 = new BarError();

      const fn = utils.trap(FooError, e => trapped.push(e));
      fn(e1);
      fn(e2);

      expect(trapped).to.deep.equal([e1, e2]);
    });


    it("should throw errors that are not of the given type", () => {
      class FooError extends Error {}
      class BarError extends Error {}
      const trapped = [];

      const e = new BarError();
      const fn = utils.trap(FooError, e => trapped.push(e));

      expect(() => fn(e))
        .to.throw(e);

      expect(trapped).to.be.empty;
    });
  });
});
