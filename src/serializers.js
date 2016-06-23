const { overrides } = require('src/utils');


const project = overrides(({id}) => ({url: `/projects/${id}`}));


const dialogue = overrides(({id}) => ({url: `/dialogues/${id}`}));


const channel = overrides(({id}) => ({url: `/channels/${id}`}));


const provider = overrides(({id}) => ({url: `/providers/${id}`}));


const team = overrides(({id, users}) => ({
  url: `/teams/${id}`,
  users: users.map(user)
}));


const user = overrides(() => ({url: void 0}));


module.exports = {
  project,
  dialogue,
  channel,
  provider,
  team,
  user
};
