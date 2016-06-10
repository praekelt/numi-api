const _ = require('koa-route');
const { dialogue: { dialogue: schema } } = require('schemas').definitions;
const { dialogues } = require('src/api');
const { dialogues: permissions } = require('src/permissions');
const contexts = require('src/contexts');
const { dialogue: serializer } = require('src/serializers');

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
    serializer,
    access: {
      permission: permissions.create,
      context: contexts.project.access
    }
  })),

  _.get('/projects/:project_id/dialogues/', list(dialogues.list, {
    serializer,
    access: {
      permission: permissions.list,
      context: contexts.project.access
    }
  })),

  _.get('/dialogues/:id', read(dialogues.get, {
    serializer,
    access: {
      permission: permissions.read,
      context: contexts.project.access
    }
  })),

  _.put('/dialogues/:id', update(dialogues.update, {
    schema,
    serializer,
    access: {
      permission: permissions.write,
      context: contexts.dialogue.access
    }
  })),

  _.patch('/dialogues/:id', patch(dialogues.patch, {
    serializer,
    access: {
      permission: permissions.write,
      context: contexts.dialogue.access
    }
  }))
];
