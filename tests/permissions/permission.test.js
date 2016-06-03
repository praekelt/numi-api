const { expect } = require('chai');
const constant = require('lodash/constant');
const permission = require('src/permissions/permission');


describe("permissions.permission", () => {
  it("should return true if the user is admin", () => {
    expect(permission(constant([{
        type: 'foo',
        namespace: 'numi',
        object_id: null
      }]))(null, {
        admin: false,
        permissions: []
      }))
      .to.be.false;

    expect(permission(constant([{
        type: 'foo',
        namespace: 'numi',
        object_id: null
      }]))(null, {
        admin: true,
        permissions: []
      }))
      .to.be.true;
  });

  it("should return true if the user has any of the allowed permissions", () => {
    const fn = permission(({fooId, barId}) => [{
      type: 'foo',
      namespace: 'numi',
      object_id: fooId
    }, {
      type: 'bar',
      namespace: 'auth',
      object_id: barId
    }], {
      numi: 'a',
      auth: 'b'
    });

    expect(fn({
        fooId: 23,
        barId: 21
      }, {
        admin: false,
        permissions: [{
          id: 1,
          type: 'foo',
          namespace: 'a',
          object_id: 21
        }, {
          id: 2,
          type: 'bar',
          namespace: 'b',
          object_id: 23
        }]
      }))
      .to.be.false;

    expect(fn({
        fooId: 23,
        barId: 21
      }, {
        admin: false,
        permissions: [{
          id: 1,
          type: 'foo',
          namespace: 'a',
          object_id: 23
        }, {
          id: 2,
          type: 'bar',
          namespace: 'b',
          object_id: 21
        }]
      }))
      .to.be.true;
  });

  it("should throw an error for unknown namespaces", () => {
    const fn = permission(constant([{
      type: 'foo',
      namespace: 'rar',
      object_id: null
    }]), {
      numi: 'a',
      auth: 'b'
    });

    expect(() => fn(null, {
        admin: false,
        permissions: []
      }))
      .to.throw("Unknown permission namespace 'rar'");
  });

  it("should expose the given definition function", () => {
    const def = constant([{
      type: 'foo',
      namespace: 'rar',
      object_id: null
    }]);

    expect(permission(def).definition).to.equal(def);
  });
});
