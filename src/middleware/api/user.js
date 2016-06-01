const isNull = require('lodash/isNull');
const get = require('lodash/get');
const constant = require('lodash/constant');


function user(fn = constant(null)) {
  return (ctx, next) => Promise.resolve(get(ctx, 'auth', null))
    .then(d => !isNull(d)
      ? fn(d)
      : null)
    .then(user => { ctx.user = user; })
    .then(() => next());
}


module.exports = user;
