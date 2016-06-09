const { expect } = require('chai');
const utils = require('src/utils');


describe('utils', () => {
  describe('conj', () => {
    it('should conjoin the given objects', () => {
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

  describe('trap', () => {
    it('should handle errors of the given type', () => {
      class FooError extends Error {}
      class BarError extends FooError {}
      const trapped = [];

      const err1 = new FooError();
      const err2 = new BarError();

      const fn = utils.trap(FooError, e => trapped.push(e));
      fn(err1);
      fn(err2);

      expect(trapped).to.deep.equal([err1, err2]);
    });


    it('should throw errors that are not of the given type', () => {
      class FooError extends Error {}
      class BarError extends Error {}
      const trapped = [];

      const err = new BarError();
      const fn = utils.trap(FooError, e => trapped.push(e));

      expect(() => fn(err))
        .to.throw(err);

      expect(trapped).to.be.empty;
    });

    it("should support multiple error types", () => {
      class FooError extends Error {}
      class BarError extends Error {}
      const trapped = [];

      const err1 = new FooError();
      const err2 = new BarError();

      const fn = utils.trap([FooError, BarError], e => trapped.push(e));
      fn(err1);
      fn(err2);

      expect(trapped).to.deep.equal([err1, err2]);
    });
  });

  describe("effect", () => {
    it('should call the function, then return the input value', () => {
      const calls = [];

      function fn(v) {
        return Promise.resolve().then(() => calls.push(v));
      }

      return Promise.resolve(23)
        .then(utils.effect(fn))
        .then(v => {
          expect(v).to.equal(23);
          expect(calls).to.deep.equal([23]);
        });
    });
  });
});
