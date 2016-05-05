const each = require('lodash/each');


function captureError(fn) {
  try {
    fn();
  }
  catch (e) {
    return e;
  }

  return null;
}


function restore(obj) {
  each(obj, v => {
    if (v && v.toString() === 'stub') v.restore();
  });
}


module.exports = {
  captureError,
  restore
};
