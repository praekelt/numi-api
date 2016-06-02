const get = require('lodash/get');


function auth() {
  return (ctx, next) => {
    ctx.auth = getAuth(ctx);
    return next();
  };
}


function getAuth(ctx) {
  const s = get(ctx.request.headers, 'authorization', '');
  const [type, ...rest] = s.split(' ');

  return type && rest.length
    ? {
      type: type.toLowerCase(),
      value: rest.join(' ')
    }
    : null;
}


module.exports = auth;
