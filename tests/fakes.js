function authResult(data) {
  return Promise.resolve({data});
}


function projectsResult(data) {
  return Promise.resolve(data);
}


module.exports = {
  authResult,
  projectsResult
};
