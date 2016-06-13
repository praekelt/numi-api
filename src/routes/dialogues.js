const _ = require('koa-route');
const { dialogue: { dialogue: schema } } = require('schemas').definitions;
const { dialogues } = require('src/api');
const contexts = require('src/contexts');
const { dialogues: permissions } = require('src/permissions');

const {
  create,
  list,
  read,
  update,
  patch
} = require('src/middlewares/methods');


module.exports = [
  _.post('/projects/:project_id/dialogues/', create(dialogues.create, {
    schema,
    access: {
      permission: permissions.create,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:project_id/dialogues/', list(dialogues.list, {
    access: {
      permission: permissions.list,
      context: contexts.project.access
    }
  })),

  _.get('/dialogues/:id', read(dialogues.get, {
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.put('/dialogues/:id', update(dialogues.update, {
    schema,
    access: {
      permission: permissions.write,
      context: contexts.dialogue.access
    }
  })),

  _.patch('/dialogues/:id', patch(dialogues.patch, {
    access: {
      permission: permissions.write,
      context: contexts.dialogue.access
    }
  }))
];
