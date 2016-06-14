const { expect } = require('chai');


function statusToNotEqual(status) {
  return resp => expect(+resp.status).to.not.equal(+status);
}


module.exports = {
  statusToNotEqual
};
