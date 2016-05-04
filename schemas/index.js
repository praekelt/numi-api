module.exports = read => ({
  definitions: {
    config: read('./config.yml'),
    user: {
      user: read('./user/user.yml'),
      new: read('./user/new.yml')
    }
  }
});
