numi api documentation
======================


.. toctree::
   :maxdepth: 2


Overview
--------

Format
~~~~~~

All response bodies are sent as JSON values.

.. TODO example success response once we have an API endpoint

Where specified, query string parameters can be provided.

.. TODO example request once we have an API endpoint that accepts parameters

Request bodies for ``POST``, ``PUT``, ``PATCH`` and ``DELETE`` requests are expected to be valid JSON values.

.. TODO example request once we have an API endpoint

Verbs
~~~~~

Unless otherwise specified, the following verbs are used for requests:

+--------+------------------------------------------------------------+
| Verb   | Description                                                |
+========+============================================================+
| GET    | Used for retrieving a resource                             |
+--------+------------------------------------------------------------+
| POST   | Used for creating a resource                               |
+--------+------------------------------------------------------------+
| PUT    | Used to replace a resource                                 |
+--------+------------------------------------------------------------+
| PATCH  | Used to partially update a resource with fields given in   |
|        | the request body                                           |
+--------+------------------------------------------------------------+
| DELETE | Used to delete a resource                                  |
+--------+------------------------------------------------------------+

.. _overview-partial-updates:

Partial updates
~~~~~~~~~~~~~~~

Partial update requests should provide instructions for how a resource should be modified according to the structure proposed in `RFC 6902`_. Note that partial updates are *atomic*, so if any of the given instructions fail, none of the instructures will be carried out.

.. _RFC 6902: http://tools.ietf.org/html/rfc6902

.. sourcecode:: http

   PATCH /projects/23/dialogues/21 HTTP/1.1
   Content-Type: application/json-patch+json

   [{
     "op": "remove",
     "path": "/sequences/0"
   }, {
     "op": "add",
     "path": "/sequences",
     "value": {
       "id": "start",
       "title": "Start of sequence",
       "blocks": []
     }
   }]


Client errors
~~~~~~~~~~~~~

All client error responses contain a ``type`, ``message`` and ``details``
fields.  ``type`` is a programmitically-usable string representing the type of
the error, ``message`` is a human-readable string describing the error and
``details`` is an object containing data specific to the error type.

.. sourcecode:: http

   HTTP/1.1 400 Bad Request

   {
     "type": "parse_error",
     "message": "Invalid JSON in request body",
     "details": {
       "reason": "Expecting value",
       "line": 1,
       "column": 9
     }
   }


Two client errors common to API endpoints expecting a request body are **parsing errors** and **validation errors**.

Parsing errors
**************

If the data provided in the request body is invalid JSON, a ``400 Bad Request`` response will be given.

The ``details`` object contains a human readable ``reason`` string describing why parsing failed, as well as the ``line`` and ``column`` numbers for where parsing failed.

.. sourcecode:: http

   HTTP/1.1 400 Bad Request
   Content-Type: application/json

   {
     "type": "parse_error",
     "message": "Invalid JSON in request body",
     "details": {
       "reason": "Expecting value",
       "line": 1,
       "column": 9
     }
   }


Validation errors
*****************

If the data provided in the request body is valid JSON, but the data does not
fit the schema for that particular request body, a ``422 Unprocessable Entity``
response will be given.

The ``details`` object contains an array of ``errors`` detailing why validation
failed. Each error object contains a programmitically-usable ``type`` string
representing the type of validation error, a ``path`` `JSON pointer`_ string
pointing to where in the given object validation failed, and a human readable
``message`` string describing the error.

.. _JSON pointer: http://tools.ietf.org/html/rfc6901

.. TODO more relevant example once we have an api endpoint

.. sourcecode:: http

   HTTP/1.1 422 Unprocessable Entity
   Content-Type: application/json

   {
     "type": "validation_error",
     "message": "Invalid request body",
     "details": {
       "errors": [{
         "type", "required",
         "path": "/foo/0/baz",
         "message": "'quux' is a required property"
       }, {
         "type", "type",
         "path": "bar",
         "message": "23 is not of type 'string'"
       }]
     }
   }

Read-only fields
~~~~~~~~~~~~~~~~
Many of the API's :ref:`data structures <data>` return read-only fields in API responses. For example, API-generated ``id`` fields, or a resource's ``url`` field. If read only fields are provided by clients in API request bodies, the way these are handled depends on the request method.

For ``PUT`` requests, in order to allow clients to more easily send back an updated description, clients may include read-only fields, but these fields will be ignored when replacing the resource.

For ``POST`` and ``PATCH`` requests, if a client provides read-only fields, the API will return an ``422 Unprocessable Entity`` response, since this case is likely to be a client error:

.. sourcecode:: http

  HTTP/1.1 422 Unprocessable Entity
  Content-Type: application/json

  {
    "type": "validation_error",
    "message": "Invalid request body",
    "details": {
      "errors": [{
        "type", "additionalProperties",
        "path": "/",
        "message": "Additional properties are not allowed ('id' was unexpected)"
      }]
    }
  }

Concepts
~~~~~~~~

Users
*****
Users have access to a set of :ref:`projects <concepts-projects>`. Depending on their :ref:`permissions <permissions>`, users can view or modify a project and its :ref:`dialogues <concepts-dialogues>`.

.. TODO link to auth once this is documented.

.. _concepts-projects:

Projects
********
A project comprises a set of :ref:`dialogues <concepts-dialogues>`. End user state is shared across dialogues under the same project.

.. _concepts-dialogues:

Dialogues
*********
A dialogue comprises the entire set of steps to follow when a user interacts with a service. It contains a set of :ref:`Sequences <concepts-sequences>`, each of which contain a set of :ref:`Blocks <concepts-blocks>`.

- :ref:`Schema for dialogue descriptions <data-dialogues>`
- :ref:`API endpoints for dialogues <dialogues>`

.. _concepts-sequences:

Sequences
*********
A sequence is a set of steps that follow one after the other, where each step corresponds to a :ref:`Block <concepts-blocks>`. A user moves from one sequence to another if different steps need to be followed based on certain conditions.

For example, a dialogue could contain a sequence with a block that asks the user a multiple choice question and moves the user to a different sequence that corresponds to their choice.

.. _concepts-blocks:

Blocks
******
A block is a single step to follow when interacting with the user. This step may be, for example, a screen asking the user a question, or a step not visible to the user, for example, registering the user with a service.

.. _concepts-symbols:

Symbols
*******
Symbols are used in a :ref:`Dialogue <concepts-dialogues>` data structure as programmatically-usable strings. Their main use is for identifying and referencing sequences, blocks and block types.


.. _concepts-revisions:

Revision
********
A revision represents a change or set of changes made to a :ref:`dialogue <concepts-dialogues>`. There are different revision types:

.. _concepts-revisions-edit:

Edit
^^^^
Applies a set of changes to a :ref:`dialogue description <data-dialogues>`. For example, changing the content in a :ref:`block <concepts-blocks>` or changing the position of a block in a :ref:`sequence <concepts-sequences>`.

.. _concepts-revisions-revert:

Revert
^^^^^^
Reverts a dialogue's description back to its state at an earlier revision.

.. _concepts-releases:

Releases
********
A release marks a point in a dialogue's history of revisions. End users will always interact with the most recently published release's corresponding dialogue description.

.. _concepts-channels:

Channels
********
A channel is an address a dialogue can use to interact with end users, for example:
  - an sms shortcode (e.g. ``2233``)
  - a USSD starcode (e.g. ``*120*321#``)
  - a twitter handle (e.g. ``@foo``)

.. _concepts-providers:

Providers
*********
A provider is a set of :ref:`channels <concepts-channels>` that corresponds to the service providing the channels. For example, Twitter would be the provider for twitter handles.

.. _permissions:

Permissions
~~~~~~~~~~~
A user's actions are limited by the permissions they have been granted. Users can be granted the following permissions:

.. _permissions-admin:

``admin``
*********
Grants create, archive, read and write access for all projects and dialogues, and publish access for all dialogues.

.. _permissions-projects-create:

``projects:create``
*******************
Grants access to create new projects. Users with this permission obtain ``project:admin`` access for the projects they create.

.. _permissions-project-admin:

``project:admin``
*****************
Grants create, archive, read, write and publish access for a given project's dialogues.

.. _permissions-project-dialogues-read:

``project:dialogues:read``
**************************
Grants read access for a given project's dialogues.

.. _permissions-project-dialogues-write:

``project:dialogues:write``
***************************
Grants write access for a given project's dialogues.

.. _permissions-dialogue-read:

``dialogue:read``
*****************
Grants read access for a given dialogue.

.. _permissions-dialogue-write:

``dialogue:write``
******************
Grants write access for a given dialogue.

.. _data:

Data Structures
---------------

.. _data-users:

Users
~~~~~

.. literalinclude:: ../schemas/user/user.yml
  :language: yaml

.. _data-user-summaries:

User Summaries
~~~~~~~~~~~~~~

.. literalinclude:: ../schemas/user/summary.yml
  :language: yaml

.. _data-projects:

Projects
~~~~~~~~

.. literalinclude:: ../schemas/project/project.yml
  :language: yaml

.. _data-project-summaries:

Project Summaries
~~~~~~~~~~~~~~~~~

.. literalinclude:: ../schemas/project/summary.yml
  :language: yaml

.. _data-dialogues:

Dialogues
~~~~~~~~~

.. literalinclude:: ../schemas/dialogue/dialogue.yml
  :language: yaml

.. _data-sequences:

Sequences
~~~~~~~~~

.. literalinclude:: ../schemas/dialogue/sequence.yml
  :language: yaml


.. _data-blocks:

Blocks
~~~~~~

.. note::
  A block's ``properties`` object is validated against a schema corresponding to the block's type (represented by the ``type`` field).

.. literalinclude:: ../schemas/dialogue/block.yml
  :language: yaml

.. _data-symbol:

Symbols
~~~~~~~

.. literalinclude:: ../schemas/dialogue/symbol.yml
  :language: yaml

.. _data-revisions:

Revisions
~~~~~~~~~

.. literalinclude:: ../schemas/revision/revision.yml
  :language: yaml

.. _data-revisions-edit:

Edits
*****

.. literalinclude:: ../schemas/revision/edit.yml
  :language: yaml

.. _data-revisions-revert:

Reverts
*******

.. literalinclude:: ../schemas/revision/revert.yml
  :language: yaml

.. _data-releases:

Releases
~~~~~~~~

.. literalinclude:: ../schemas/release.yml
  :language: yaml

.. _data-dialogue-summaries:

Dialogue Summaries
~~~~~~~~~~~~~~~~~~

.. literalinclude:: ../schemas/dialogue/summary.yml
  :language: yaml

.. _data-permissions:

Permissions
~~~~~~~~~~~

.. literalinclude:: ../schemas/permission/permission.yml
  :language: yaml

``project:admin``
*****************

.. literalinclude:: ../schemas/permission/project-admin.yml
  :language: yaml

``project:dialogues:read``
**************************

.. literalinclude:: ../schemas/permission/project-dialogues-read.yml
  :language: yaml

``project:dialogues:write``
***************************

.. literalinclude:: ../schemas/permission/project-dialogues-write.yml
  :language: yaml

``dialogue:read``
*****************

.. literalinclude:: ../schemas/permission/dialogue-read.yml
  :language: yaml

``dialogue:write``
******************

.. literalinclude:: ../schemas/permission/dialogue-write.yml
  :language: yaml

.. _data-channels:

Channels
~~~~~~~~

.. literalinclude:: ../schemas/channel/channel.yml
  :language: yaml

.. _data-channel-summaries:

Channel Summaries
~~~~~~~~~~~~~~~~~

.. literalinclude:: ../schemas/channel/summary.yml
  :language: yaml

.. _data-providers:

Providers
~~~~~~~~~

.. literalinclude:: ../schemas/provider/provider.yml
  :language: yaml

.. _data-provider-summaries:

Provider Summaries
~~~~~~~~~~~~~~~~~~

.. literalinclude:: ../schemas/provider/summary.yml
  :language: yaml

.. _users:

Users
-----

.. http:get:: /user

  Retrieves the :ref:`description <data-users>` of the authenticated user.

  .. sourcecode:: http

      GET /user HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "url": "/users/1",
       "email": "foo@bar.org",
       "first_name": "Joan",
       "last_name": "Watson",
       "permissions": [{
         "type": "admin"
       }]
     }

.. http:get:: /users/

  Retrieves the :ref:`summaries <data-user-summaries>` of all users. Only
  accessible if the authenticated user has :ref:`admin permission <permissions-admin>`.

  .. sourcecode:: http

      GET /user HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "url": "/users/1",
       "email": "foo@bar.org",
       "first_name": "Joan",
       "last_name": "Watson"
     }]

    :query number page:
      1-based index of the page of users to show. Defaults to ``1``.

    :query number per_page:
      Number of users to show per page. Defaults to ``30``. Maximum is ``100``.

.. http:get:: /users/(str:user_id)

  Retrieves the :ref:`description <data-users>` of the user with id
  ``user_id``.

  .. sourcecode:: http

     GET /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "url": "/users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "email": "foo@bar.org",
       "first_name": "Joan",
       "last_name": "Watson"
     }

.. http:put:: /users/(str:user_id)

  Replaces the :ref:`description <data-users>` of the user with id ``user_id``
  with the description given in the request body and returns the given
  description, along with the user's ``id`` and the ``url`` for accessing the
  user's description.

  This operation is only accessible to the authenticated user if their user id is ``user_id``, or if they have :ref:`admin permission <permissions-admin>`.

  .. sourcecode:: http

     PUT /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427 HTTP/1.1
     Content-Type: application/json

     {
       "first_name": "Joan",
       "last_name": "Watson"
     }

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "url": "/users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "email": "foo@bar.org",
       "first_name": "Joan",
       "last_name": "Watson"
     }

.. http:patch:: /users/(str:user_id)

  Partially updates the :ref:`description <data-users>` of the user with id
  ``user_id`` using the :ref:`instructions <overview-partial-updates>` given in
  the request body and returns the given user's description, along with the
  user's ``id`` and the ``url`` for accessing the user's description.

  This operation is only accessible to the authenticated user if their user id is ``user_id``, or if they have :ref:`admin permission <permissions-admin>`.

  .. sourcecode:: http

     PATCH /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427 HTTP/1.1
     Content-Type: application/json-patch+json

     [{
       "op": "replace",
       "path": "/first_name",
       "value": "Joan"
     }]

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "url": "/users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427",
       "email": "foo@bar.org",
       "first_name": "Joan",
       "last_name": "Watson"
     }


Permissions
-----------

.. http:get:: /users/(str:user_id)/permissions/

  Retrieves the :ref:`permissions <data-permissions>` accessible to the
  authenticating user for the user with id ``user_id``.

  .. sourcecode:: http

     GET /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427/permissions/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "9a12594f30220f6a91bde8da961505be",
       "type": "admin"
     }]

.. http:get:: /users/(str:user_id)/permissions/(str:permission_id)

   Retrieves the :ref:`permission <data-permissions>` with id ``permission_id``
   for the user with id ``user_id``.

  .. sourcecode:: http

     GET /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427/permissions/9a12594f30220f6a91bde8da961505be HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "9a12594f30220f6a91bde8da961505be",
       "type": "admin"
     }

.. http:post:: /users/(str:user_id)/permissions/

  Creates a new :ref:`permission <data-permissions>` for the user with id
  ``user_id`` and returns the created permission.

  .. sourcecode:: http

     POST /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427/permissions/ HTTP/1.1
     Content-Type: application/json

     {
       "type": "projects:admin",
       "details": {
         "project_id": "23"
       }
     }

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "2294e0854d66b461eceddbf239f80f04",
       "type": "projects:admin",
       "details": {
         "project_id": "23"
       }
     }

.. http:delete:: /users/(str:user_id)/permissions/(str:permission_id)

  Revokes the permission with id ``permission_id`` for the user with id
  ``user_id`` and returns the revoked permission.

  .. sourcecode:: http

     DELETE /users/0a2d19e0-bb10-4b84-98cc-52a82b6ed427/permissions/2294e0854d66b461eceddbf239f80f04 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "2294e0854d66b461eceddbf239f80f04",
       "type": "projects:admin",
       "details": {
         "project_id": "23"
       }
     }

.. _projects:

Projects
--------

.. http:get:: /projects/

  Retrieves a :ref:`summary <data-project-summaries>` of projects the authenticated user has access to.

  .. sourcecode:: http

      GET /projects/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "1",
       "title": "Maternal Health ZA",
       "url": "/projects/1"
     }, {
       "id": "2",
       "title": "Maternal Health MX",
       "url": "/projects/2",
     }]

  :query number page:
    1-based index of the page of projects to show. Defaults to ``1``.

  :query number per_page:
    Number of projects to show per page. Defaults to ``30``. Maximum is
    ``100``.


.. http:get:: /projects/(str:project_id)

  Retrieves the :ref:`description <data-projects>` of the project with id ``project_id``.

  .. sourcecode:: http

      GET /projects/23 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "title": "Maternal Health ZA"
       "url": "/projects/23",
       "is_archived": false,
       "dialogues": [{
         "id": "21",
         "title": "Service Rating Survey",
         "url": "/projects/23/dialogues/21",
         "is_archived": false,
         "is_published": false,
         "has_changes": false
       }]
     }

If the project isn't found, a ``404`` response will be given. The response body's ``details`` object contains the ``id`` of the project given in the request.

  .. sourcecode:: http

     HTTP/1.1 404 Not Found
     Content-Type: application/json

     {
       "type": "not_found",
       "message": "Project 23 not found",
       "details": {"id": "23"}
     }

.. http:post:: /projects/

  Creates a new project with the :ref:`project description <data-projects>`
  given in the request body and returns the created projects's description,
  along with the generated dialogue ``id`` field and ``url`` field for
  accessing the project description.

  The authenticated user creating the project is given :ref:`project admin
  <permissions-project-admin>` access for the newly created project.

  .. sourcecode:: http

     POST /projects/ HTTP/1.1
     Content-Type: application/json

     {
       "title": "Maternal Health ZA",
     }

  .. sourcecode:: http

     HTTP/1.1 201 Created
     Content-Type: application/json

     {
       "id": "23",
       "url": "/projects/23",
       "title": "Maternal Health ZA",
       "dialogues": [],
       "is_archived": false
     }

.. _projects-put:

.. http:put:: /projects/(str:project_id)

  Replaces the :ref:`description <data-projects>` of the project with id ``project_id`` with the description given in the request body and returns the given description, along with the projects's ``id`` and the ``url`` for accessing the projects's description.

  .. sourcecode:: http

     PUT /projects/23 HTTP/1.1
     Content-Type: application/json

     {
       "id": "23",
       "title": "Maternal Health ZA"
     }

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "title": "Maternal Health ZA"
       "url": "/projects/23",
       "is_archived": false,
       "dialogues": [{
         "id": "21",
         "title": "Service Rating Survey",
         "url": "/projects/23/dialogues/21",
         "is_archived": false,
         "is_published": false,
         "has_changes": false
       }]
     }

.. _projects-patch:

.. http:patch:: /projects/(str:project_id)/

  Partially updates the :ref:`description <data-projects>` of the project with id ``project_id`` with the :ref:`instructions <overview-partial-updates>` in the request body and returns the given description, along with the projects's ``id`` and the ``url`` for accessing the project's description.

.. sourcecode:: http

   PATCH /projects/23 HTTP/1.1
   Content-Type: application/json-patch+json

   [{
     "op": "replace",
     "path": "/title",
     "value": "Maternal Health ZA"
   }]

.. sourcecode:: http

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
     "id": "23",
     "title": "Maternal Health ZA"
     "url": "/projects/23",
     "is_archived": false,
     "dialogues": [{
       "id": "21",
       "title": "Service Rating Survey",
       "url": "/projects/23/dialogues/21",
       "is_archived": false,
       "is_published": false,
       "has_changes": false
     }]
   }

.. _dialogues:

Dialogues
---------

.. _dialogues-get:

.. http:get:: /projects/(str:project_id)/dialogues/

  Retrieves a :ref:`summary <data-dialogue-summaries>` of every dialogue
  contained in the project with id ``project_id``.

  .. sourcecode:: http

      GET /projects/23/dialogues/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "21",
       "title": "Service Rating Survey",
       "url": "/projects/23/dialogues/21",
       "is_archived": false,
       "is_published": false,
       "has_changes": false
     }]

  :query boolean is_archived:
    If ``false``, only return unarchived dialogues. If ``true``, only return archived dialogues. If omitted, both archived and unarchived dialogues are retrieved.

  :query boolean is_published:
    If ``false``, only return unpublished dialogues. If ``true``, only return published dialogues. If omitted, both published and unpublished dialogues are retrieved.

  :query boolean has_changes:
    If ``false``, only return dialogues without unpublished changes. If ``true``, only return dialogues with unpublished changes. If omitted, dialogues with published and unpublished changes are retrieved.

.. http:get:: /projects/(str:project_id)/dialogues/(str:dialogue_id)

Retrieves the :ref:`description <data-dialogues>` of the dialogue with id ``dialogue_id`` in the project with id ``project_id``.

  .. sourcecode:: http

      GET /projecs/23/dialogues/21 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "21",
       "title": "Service Rating Survey",
       "sequences": [],
       "is_archived": false,
       "is_published": false,
       "has_changes": false
     }

If the dialogue isn't found, a ``404`` response will be given. The response body's ``details`` object contains the ``id`` given in the request.

  .. sourcecode:: http

     HTTP/1.1 404 Not Found
     Content-Type: application/json

     {
       "type": "not_found",
       "message": "Dialogue 21 not found",
       "details": {"id": "21"}
     }

.. http:post:: /projects/(str:project_id)/dialogues/

  Creates a new dialogue under the project with the id ``project_id`` using the
  :ref:`dialogue description <data-dialogues>` given in the request body and
  returns the created dialogue's description, along with the generated dialogue
  ``id`` field and ``url`` field for accessing the dialogue description.

  .. sourcecode:: http

     POST /projects/23/dialogues/ HTTP/1.1
     Content-Type: application/json

     {
       "title": "Service Rating Survey",
       "sequences": []
     }

  .. sourcecode:: http

     HTTP/1.1 201 Created
     Content-Type: application/json

     {
       "id": "21",
       "url": "/projects/23/dialogues/21",
       "title": "Service Rating Survey",
       "sequences": [],
       "is_archived": false,
       "is_published": false,
       "has_changes": false
     }

.. _dialogues-put:

.. http:put:: /projects/(str:project_id)/dialogues/(str:dialogue_id)

  Replaces the :ref:`description <data-dialogues>` of the dialogue with id
  ``dialogue_id`` in the project with id ``project_id`` with the description
  given in the request body and returns the given description, along with the
  dialogue's ``id`` and the ``url`` for accessing the dialogue's description.

  Replacing the dialogue creates a new :ref:`edit revision
  <concepts-revisions-edit>` with a `JSON patch`_ representing the
  instructions needed to change the current dialogue description to the new
  description given in the request body.

  .. _JSON Patch: http://tools.ietf.org/html/rfc6902

  .. sourcecode:: http

    POST /projects/23/dialogues/21 HTTP/1.1
    Content-Type: application/json

    {
      "title": "Service Rating Survey",
      "sequences": [],
      "is_archived": false
    }

  .. sourcecode:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
      "id": "21",
      "url": "/projects/23/dialogues/21",
      "title": "Service Rating Survey",
      "sequences": [],
      "is_archived": false,
      "is_published": false,
      "has_changes": false
    }

.. warning::
  If the ``id`` of a :ref:`sequence <data-sequences>` or :ref:`block <data-blocks>` is changed, the API will regard the changed sequence or block as a new entity. This means all state previously associated to the sequence or block (for example, metrics and translations) will no longer be associated with it.

.. _dialogues-patch:

.. http:patch:: /projects/(str:project_id)/dialogues/(str:dialogue_id)

  Partially updates the :ref:`description <data-dialogues>` of the dialogue
  with id ``dialogue_id`` in the project with id ``project_id`` with the
  :ref:`instructions <overview-partial-updates>` in the request body and
  returns the given description, along with the dialogue's ``id`` and the
  ``url`` for accessing the dialogue's description.

  Partially updating the dialogue creates a new :ref:`edit revision
  <concepts-revisions-edit>` using the provided patch instructions.

.. sourcecode:: http

   PATCH /projects/23/dialogues/21 HTTP/1.1
   Content-Type: application/json-patch+json

   [{
     "op": "remove",
     "path": "/sequences/0"
   }, {
     "op": "add",
     "path": "/sequences",
     "value": {
       "id": "start",
       "title": "Start of sequence",
       "blocks": []
     }
   }]

.. sourcecode:: http

   HTTP/1.1 200 OK
   Content-Type: application/json

   {
     "id": "21",
     "url": "/projects/23/dialogues/21",
     "title": "Service Rating Survey",
     "sequences": [{
       "id": "start",
       "title": "Start of sequence",
       "blocks": []
     }],
     "is_archived": false,
     "is_published": false,
     "has_changes": false
   }

.. warning::
  If the ``id`` of a :ref:`sequence <data-sequences>` or :ref:`block <data-blocks>` is changed, the API will regard the changed sequence or block as a new entity. This means all state previously associated to the sequence or block (for example, metrics and translations) will no longer be associated with it.


Archiving dialogues
~~~~~~~~~~~~~~~~~~~
A dialogue can be archived by setting ``is_archived`` to ``true`` when :ref:`replacing <dialogues-put>` or :ref:`partially updating <dialogues-patch>` the dialogue description. The dialogue is still accessible via the api, but will no longer be triggered by any events associated to it.

.. TODO ^ reference events if and when they are documented

.. _revisions:

Revisions
---------

.. http:get:: /projects/(str:project_id)/dialogues/(str:dialogue_id)/revisions/

  Retrieves the :ref:`revisions <data-revisions>` of dialogue ``dialogue_id``
  in the project ``project_id``.

  .. sourcecode:: http

     GET /projects/23/dialogues/21/revisions/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "1",
       "number": 1,
       "user_id": "17",
       "created": 1459943775033,
       "type": "edit",
       "details": {
         "id": "start",
         "title": "Start of sequence",
       },
       "properties": {
         "edit_type": "new_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences",
           "value": {
             "id": "start",
             "title": "Start of sequence",
             "blocks": []
           }
         }]
       }
     }]

  :query number page:
    1-based index of the page of revisions to show. Defaults to ``1``.
  :query number per_page:
    Number of revisions to show per page. Defaults to ``30``. Maximum is
    ``100``.
  :query string ordering:
    The ordering of the returned revisions. If multiple ``ordering`` parameters
    are provided, the returned revisions will be sorted by each provided
    parameter, in the order the parameters were specified. Defaults to
    ``-number``.

Ordering revisions
~~~~~~~~~~~~~~~~~~

+--------------+------------------------------------------------------------+
| Parameter    | Description                                                |
+==============+============================================================+
| ``number``   | Return revisions in ascending order of revision number     |
+--------------+------------------------------------------------------------+
| ``-number``  | Return revisions in descending order of revision number    |
+--------------+------------------------------------------------------------+
| ``created``  | Return revisions in ascending order of creation date       |
+--------------+------------------------------------------------------------+
| ``-created`` | Return revisions in descending order of creation date      |
+--------------+------------------------------------------------------------+

.. http:post:: /projects/(str:project_id)/dialogues/(str:dialogue_id)/revisions/

Creates a new revision for dialogue ``dialogue_id`` under project
``project_id`` using the :ref:`description <data-revisions>` given in
the request body and returns the created revisions's description, along with
the generated ``id`` field and ``url`` field for accessing the revision
description.

Creating a new revision updates the dialogue's description. Any new requests
to :ref:`retrieve <dialogues-get>` the dialogue will return a dialogue
:ref:`description <data-dialogues>` with the new revision applied.

  .. sourcecode:: http

     POST /projects/23/dialogues/21/revisions/ HTTP/1.1
     Content-Type: application/json

     {
       "type": "edit",
       "details": {
         "id": "start",
         "title": "Start of sequence",
       },
       "properties": {
         "edit_type": "new_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences",
           "value": {
             "id": "start",
             "title": "Start of sequence",
             "blocks": []
           }
         }]
       }
     }

  .. sourcecode:: http

     HTTP/1.1 201 Created
     Content-Type: application/json

     {
       "id": "1",
       "number": 1,
       "user_id": "17",
       "created": 1459943775033,
       "type": "edit",
       "details": {
         "id": "start",
         "title": "Start of sequence",
       },
       "properties": {
         "edit_type": "new_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences",
           "value": {
             "id": "start",
             "title": "Start of sequence",
             "blocks": []
           }
         }]
       }
     }

It is also possible to create revisions in bulk by providing an array of revisions. In this case, an array of revision descriptions will be returned:

  .. sourcecode:: http

     POST /projects/23/dialogues/21/revisions/ HTTP/1.1
     Content-Type: application/json

     [{
       "type": "edit",
       "details": {
         "id": "start",
         "title": "Start of sequence",
       },
       "properties": {
         "edit_type": "new_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences",
           "value": {
             "id": "start",
             "title": "Start of sequence",
             "blocks": []
           }
         }]
       }
     }, {
       "type": "edit",
       "details": {
         "id": "start",
         "old_title": "Start of sequence",
         "new_title": "Start"
       },
       "properties": {
         "edit_type": "rename_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences/title",
           "value": "Start"
         }]
       }
     }]

  .. sourcecode:: http

     HTTP/1.1 201 Created
     Content-Type: application/json

     [{
       "id": "1",
       "number": 1,
       "user_id": "17",
       "created": 1459943775033,
       "type": "edit",
       "details": {
         "id": "start",
         "title": "Start of sequence",
       },
       "properties": {
         "edit_type": "new_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences",
           "value": {
             "id": "start",
             "title": "Start of sequence",
             "blocks": []
           }
         }]
       }
     }, {
       "id": "2",
       "number": 2,
       "user_id": "17",
       "created": 1459943775033,
       "type": "edit",
       "details": {
         "id": "start",
         "old_title": "Start of sequence",
         "new_title": "Start"
       },
       "properties": {
         "edit_type": "rename_sequence",
         "patch": [{
           "op": "add",
           "path": "/sequences/title",
           "value": "Start"
         }]
       }
     }]

.. note
  Created revisions in bulk is done atomically. If one of the given revisions cannot be created, none of the given revisions will be created.


Releases
--------

.. http:get:: /projects/(str:project_id)/dialogues/(str:dialogue_id)/releases/

Retrieves the :ref:`descriptions <data-releases>` of the :ref:`releases
<concepts-releases>` of dialogue ``dialogue_id`` in the project ``project_id``.

  .. sourcecode:: http

    GET /projects/23/dialogues/21/releases/ HTTP/1.1

  .. sourcecode:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    [{
      "id": "1",
      "number": 1,
      "url": "/projects/23/dialogues/21/releases/1",
      "revision_id": "7"
    }]

  :query number page:
    1-based index of the page of releases to show. Defaults to ``1``.
  :query number per_page:
    Number of releases to show per page. Defaults to ``30``. Maximum is
    ``100``.
  :query string ordering:
    The ordering of the returned releases. If multiple ``ordering`` parameters
    are provided, the returned releases will be sorted by each provided
    parameter, in the order the parameters were specified. Defaults to
    ``-number``.

Ordering releases
~~~~~~~~~~~~~~~~~~

+--------------+------------------------------------------------------------+
| Parameter    | Description                                                |
+==============+============================================================+
| ``number``   | Return releases in ascending order of release number       |
+--------------+------------------------------------------------------------+
| ``-number``  | Return releases in descending order of release number      |
+--------------+------------------------------------------------------------+
| ``created``  | Return releases in ascending order of creation date        |
+--------------+------------------------------------------------------------+
| ``-created`` | Return releases in descending order of creation date       |
+--------------+------------------------------------------------------------+

.. http:get:: /projects/(str:project_id)/dialogues/(str:dialogue_id)/releases/(str:release_id)

Retrieves the :ref:`description <data-releases>` for the release with id
``release_id`` for dialogue ``dialogue_id`` contained in the project with id
``project_id``.

  .. sourcecode:: http

      GET /projects/23/dialogues/21/releases/44 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

    {
      "id": "1",
      "number": 1,
      "url": "/projects/23/dialogues/21/releases/1",
      "revision_id": "7",
      "created": 1460022608855
    }

If the release isn't found, a ``404`` response will be given. The response body's ``details`` object contains the ``id`` and ``dialogue_id`` given in the request.

  .. sourcecode:: http

     HTTP/1.1 404 Not Found
     Content-Type: application/json

     {
       "type": "not_found",
       "message": "Release 44 not found",
       "details": {
         "id": "44",
         "dialogue_id": "21"
       }
     }

.. http:post:: /projects/(str:project_id)/dialogues/(str:dialogue_id)/releases/

Creates a new release for dialogue ``dialogue_id`` under the project with the id ``project_id`` using the :ref:`description <data-releases>` given in the request body and returns the created releases's description, along with the generated release ``id`` field and ``url`` field for accessing the release description.

  .. sourcecode:: http

    POST /projects/23/dialogues/21/releases/ HTTP/1.1
    Content-Type: application/json

    {
      "revision_id": "7"
    }

  .. sourcecode:: http

    HTTP/1.1 201 Created
    Content-Type: application/json

    {
      "id": "1",
      "number": 1,
      "revision_id": "7",
      "created": 1460022608855,
      "url": "/projects/23/dialogues/21/releases/1"
    }


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
