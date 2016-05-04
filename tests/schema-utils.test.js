const { expect } = require('chai');
const {
  defaults,
  omitReadOnly
} = require('src/schema-utils');


describe('schema-utils', () => {
  describe('defaults', () => {
    it('should return defaults', () => {
      expect(defaults({
        type: 'object',
        properties: {
          foo: {default: 23},
          bar: {default: 21},
          quux: {
            type: 'object',
            properties: {
              corge: {default: 2},
              grault: {default: 3}
            }
          }
        }
      }, {
        foo: 'rar',
        baz: 1,
        quux: {
          corge: 4,
          garply: 5
        }
      }))
      .to.deep.equal({
        foo: 'rar',
        bar: 21,
        baz: 1,
        quux: {
          corge: 4,
          grault: 3,
          garply: 5
        }
      });
    });
  });

  describe('omitReadOnly', () => {
    it('should omit read only properties', () => {
      expect(omitReadOnly({
        type: 'object',
        properties: {
          foo: {readOnly: true},
          bar: {}
        }
      }, {
        foo: 21,
        bar: 23
      }))
      .to.deep.equal({bar: 23});
    });
  });
});
