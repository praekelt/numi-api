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

All client error responses contain a ``type``, ``message`` and ``details``
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

.. _concepts-users:

Users
*****
Users have access to a set of :ref:`projects <concepts-projects>` based on the permisions of the :ref:`teams <concepts-teams>` they are members of. The projects that users have access to may span multiple :ref:`organizations <concepts-orgs>`.

.. _concepts-teams:

Teams
*****
A team comprises a set of :ref:`users <concepts-users>`. Each team has a set of :ref:`permissions <permissions>` defining the actions its members are permitted to carry out.

.. _concepts-orgs:

Organizations
*************
Organizations are the highest scope for resource ownership. The relations between organizations and other resources is as follows:
  - Each :ref:`project <concepts-projects>` is owned by exactly one organization
  - Each :ref:`team <concepts-teams>` is owned by exactly one organization
  - :ref:`Users <concepts-users>` may be members of zero or more organizations
  - Each :ref:`provider <concepts-providers>` and its :ref:`channels
    <concepts-channels>` is contained under exactly one organization

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
Applies a set of changes to a :ref:`dialogue description <data-dialogue>`. For
example, changing the content in a :ref:`block <concepts-blocks>` or changing
the position of a block in a :ref:`sequence <concepts-sequences>`.

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

Numi builds on the permissions provided by `seed-auth-api`_. The permissions provided by seed-auth-api (for example, ``admin`` and ``org:admin``), are granted outside of this API.

.. _seed-auth-api: https://seed-auth-api.readthedocs.io

Teams can be granted the following permissions:

.. _permissions-org-admin:

``org:admin`` (seed-auth-api)
*****************************
Grants create, read, write and archive access to an organization and all resources contained under it, including the organization's projects and their dialogues, revisions and releases, as well as the organization's providers and channels.

``org:admin``\'s are able to grant any permission to the relevant organization's teams, provided the permission relates to the organization or the projects contained under it.

.. _permissions-project-admin:

``project:admin``
*****************
Grants create, read, write and archive access to a project and all resources contained it, including dialogues, revisions, and releases, as well as channels currently owned by the project and teams with permissions relevant to the project.

``project:admin``\'s are able to grant any permission to the project's organization's teams, provided the permission relates to the project.

.. _permissions-project-read:

``project:read``
****************
Grants read-only access to a project and all resources contained under it, including dialogues, as well as channels currently owned by the project, and teams with permissions relevant to the project.

.. _permissions-project-write:

``project:write``
*****************
With the exception of write access to releases, grants create, read and write access to a project and all resources contained under it, including dialogues, revisions, as well as channels currently owned by the project and teams with permissions relevant to the project.

.. _teams:

Teams
-----

.. http:get:: /teams/

  Retrieves the :ref:`summaries <data-team-summary>` of all teams that the
  authenticated user has access to.

  .. sourcecode:: http

     GET /teams/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "23",
       "url": "/teams/23",
       "title": "Service Designers",
       "members": [{
         "id": "1",
         "url": "/users/1",
         "first_name": "Sarima"
       }],
       "permissions": [{
         "id": 44,
         "type": "project:admin",
         "object_id": 21
       }],
       "organization": {
         "id": 2,
         "title": "MH"
       }
     }]

  :query number page:
    1-based index of the page of teams to show. Defaults to ``1``.

  :query number per_page:
    Number of teams to show per page. Defaults to ``30``. Maximum is ``100``.

.. http:get:: /teams/(str:team_id)

  Retrieves the :ref:`description <data-team>` of the team with id ``team_id``.

  .. sourcecode:: http

     GET /teams/23 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "url": "/teams/23",
       "title": "Service Designers",
       "members": [{
         "id": "1",
         "url": "/users/1",
         "first_name": "Sarima"
       }],
       "permissions": [{
         "id": 44,
         "type": "project:admin",
         "object_id": 21
       }],
       "organization": {
         "id": 2,
         "title": "MH"
       }
     }

Permissions
-----------

.. http:get:: /team/(str:team_id)/permissions/

  Retrieves the :ref:`permissions <data-permissions>` accessible to the
  authenticating user for the team with id ``team_id``.

  .. sourcecode:: http

     GET /teams/21/permissions/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "21",
       "type": "admin",
       "object_id": 23
     }]

.. http:get:: /teams/(str:team_id)/permissions/(str:permission_id)

  Retrieves the :ref:`permission <data-permissions>` with id ``permission_id``
  for the team with id ``team_id``.

  .. sourcecode:: http

     GET /teams/21/permissions/182 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": 182,
       "type": "admin",
       "object_id": 44
     }

.. http:post:: /teams/(str:team_id)/permissions/

  Creates a new :ref:`permission <data-permissions>` for the team with id
  ``team_id`` and returns the created permission.

  .. sourcecode:: http

     POST /teams/21/permissions/ HTTP/1.1
     Content-Type: application/json

     {
       "type": "projects:admin",
       "object_id": 23
     }

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": 182,
       "type": "projects:admin",
       "object_id": 23
     }

.. http:delete:: /teams/(str:team_id)/permissions/(str:permission_id)

  Revokes the permission with id ``permission_id`` for the team with id
  ``team_id`` and returns the revoked permission.

  .. sourcecode:: http

     DELETE /teams/21/permissions/182 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": 182,
       "type": "projects:admin",
       "object_id": 23
     }

.. _projects:

Projects
--------

.. http:get:: /projects/

  Retrieves a :ref:`summary <data-project-summary>` of projects the
  authenticated user has access to.

  .. sourcecode:: http

     GET /projects/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "1",
       "organization_id": "21",
       "title": "Maternal Health ZA",
       "url": "/projects/1"
     }, {
       "id": "2",
       "organization_id": "21",
       "title": "Maternal Health MX",
       "url": "/projects/2",
     }]

  :query number page:
    1-based index of the page of projects to show. Defaults to ``1``.

  :query number per_page:
    Number of projects to show per page. Defaults to ``30``. Maximum is
    ``100``.


.. http:get:: /projects/(str:project_id)

  Retrieves the :ref:`description <data-project>` of the project with id
  ``project_id``.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the project's organization
    - ``project:admin`` for the project
    - ``project:write`` for the project
    - ``project:read`` for the project

  .. sourcecode:: http

     GET /projects/23 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "organization_id": "21",
       "title": "Maternal Health ZA"
       "url": "/projects/23",
       "is_archived": false,
       "dialogues": [{
         "id": "21",
         "title": "Service Rating Survey",
         "url": "/projects/23/dialogues/21",
         "is_archived": false,
         "is_published": false,
         "has_changes": false,
         "can_view": true,
         "can_edit": true
       }]
     }

  If the project isn't found, a ``404`` response will be given. The response
  body's ``details`` object contains the ``id`` of the project given in the
  request.

  .. sourcecode:: http

     HTTP/1.1 404 Not Found
     Content-Type: application/json

     {
       "type": "not_found",
       "message": "Project 23 not found",
       "details": {"id": "23"}
     }

.. http:get:: /projects/(str:project_id)/teams/

  Retrieves the :ref:`summaries <data-team-summary>` of all teams with
  permissions related to the project with id ``project_id``.

  .. sourcecode:: http

     GET /projects/21/teams/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "23",
       "url": "/teams/23",
       "title": "Service Designers",
       "members": [{
         "id": "1",
         "url": "/users/1",
         "first_name": "Sarima"
       }],
       "permissions": [{
         "id": 44,
         "type": "project:admin",
         "object_id": 21
       }],
       "organization": {
         "id": 2,
         "title": "MH"
       }
     }]

.. http:post:: /organizations/(str:organization_id)/projects/

  Creates a new project with the :ref:`project description <data-project>`
  given in the request body underneath the organization with the id
  ``organization_id`` using the and returns the created projects's description,
  along with the generated dialogue ``id`` field and ``url`` field for
  accessing the project description.

  .. sourcecode:: http

     POST /organizations/21/projects/ HTTP/1.1
     Content-Type: application/json

     {
       "title": "Maternal Health ZA",
     }

  .. sourcecode:: http

     HTTP/1.1 201 Created
     Content-Type: application/json

     {
       "id": "23",
       "organization_id": "21",
       "url": "/projects/23",
       "title": "Maternal Health ZA",
       "dialogues": [],
       "is_archived": false
     }

.. _projects-put:

.. http:put:: /projects/(str:project_id)

  Replaces the :ref:`description <data-project>` of the project with id
  ``project_id`` with the description given in the request body and returns the
  given description, along with the projects's ``id`` and the ``url`` for
  accessing the projects's description.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the project's organization
    - ``project:admin`` for the project
    - ``project:write`` for the project

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
       "organization_id": "21",
       "title": "Maternal Health ZA"
       "url": "/projects/23",
       "is_archived": false,
       "dialogues": [{
         "id": "21",
         "title": "Service Rating Survey",
         "url": "/projects/23/dialogues/21",
         "is_archived": false,
         "is_published": false,
         "has_changes": false,
         "can_view": true,
         "can_edit": true
       }]
     }

.. _projects-patch:

.. http:patch:: /projects/(str:project_id)/

  Partially updates the :ref:`description <data-project>` of the project with
  id ``project_id`` with the :ref:`instructions <overview-partial-updates>` in
  the request body and returns the given description, along with the projects's
  ``id`` and the ``url`` for accessing the project's description.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the project's organization
    - ``project:admin`` for the project
    - ``project:write`` for the project

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
     "organization_id": "21",
     "title": "Maternal Health ZA"
     "url": "/projects/23",
     "is_archived": false,
     "dialogues": [{
       "id": "21",
       "title": "Service Rating Survey",
       "url": "/projects/23/dialogues/21",
       "is_archived": false,
       "is_published": false,
       "has_changes": false,
       "can_view": true,
       "can_edit": true
     }]
   }

.. http:get:: /projects/(str:project_id)/channels/

  Retrieves the :ref:`descriptions <data-channel>` of the channels accessible
  to the project with the id ``project_id``.

  .. sourcecode:: http

     GET /projects/21/channels/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "23",
       "url": "/channels/23",
       "project_id": "21",
       "title": "@foo",
       "address": "@foo",
       "type": "twitter",
       "is_available": true,
       "provider": {
         "id": "21",
         "title": "Twitter"
       }
     }]


.. _dialogues:

Dialogues
---------

.. _dialogues-get:

.. http:get:: /projects/(str:project_id)/dialogues/

  Retrieves a :ref:`summary <data-dialogue-summary>` of every dialogue
  contained in the project with id ``project_id``.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the organization
    - ``project:admin`` for the project
    - ``project:write`` for the project
    - ``project:read`` for the project

  .. sourcecode:: http

      GET /projects/23/dialogues/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "21",
       "title": "Service Rating Survey",
       "url": "/dialogues/21",
       "is_archived": false,
       "is_published": false,
       "has_changes": false,
       "can_view": true,
       "can_edit": true
     }]

  :query boolean is_archived:
    Filter on whether this dialogue has been archived.

  :query boolean is_published:
    Filter on whether this dialogue has been published.

  :query boolean has_changes:
    Filter on whether this dialogue has unpublished changes or not.

  :query boolean can_view:
    Filter on whether the user can view this dialogue or not.

  :query boolean can_edit:
    Filter on whether the user can edit this dialogue or not.


.. http:get:: /dialogues/(str:dialogue_id)

  Retrieves the :ref:`description <data-dialogue>` of the dialogue with id
  ``dialogue_id``.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the organization that owns the project under which the
      dialogue is contained
    - ``project:admin`` for the project under which the dialogue is contained
    - ``project:write`` for the project under which the dialogue is contained
    - ``project:read`` for the project under which the dialogue is contained

  .. sourcecode:: http

      GET /dialogues/21 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "21",
       "title": "Service Rating Survey",
       "sequences": [],
       "is_archived": false,
       "is_published": false,
       "has_changes": false,
       "can_view": true,
       "can_edit": true
     }

  If the dialogue isn't found, a ``404`` response will be given. The response
  body's ``details`` object contains the ``id`` given in the request.

  .. sourcecode:: http

     HTTP/1.1 404 Not Found
     Content-Type: application/json

     {
       "type": "not_found",
       "message": "Dialogue 21 not found",
       "details": {"id": "21"}
     }

.. http:get:: /dialogues/(str:dialogue_id)/teams/

  Retrieves the :ref:`summaries <data-team-summary>` of all teams with
  permissions related to the dialogue with id ``dialogue_id``.

  .. sourcecode:: http

     GET /dialogues/21/teams/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "23",
       "url": "/teams/23",
       "title": "Service Designers",
       "members": [{
         "id": "1",
         "url": "/users/1",
         "first_name": "Sarima"
       }],
       "permissions": [{
         "id": 44,
         "type": "project:admin",
         "object_id": 21
       }],
       "organization": {
         "id": 2,
         "title": "MH"
       }
     }]

.. http:post:: /projects/(str:project_id)/dialogues/

  Creates a new dialogue under the project with the id ``project_id`` using the
  :ref:`dialogue description <data-dialogue>` given in the request body and
  returns the created dialogue's description, along with the generated dialogue
  ``id`` field and ``url`` field for accessing the dialogue description.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the organization that owns the project under which the
      dialogue is contained
    - ``project:admin`` for the project under which the dialogue is contained
    - ``project:write`` for the project under which the dialogue is contained

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
       "url": "/dialogues/21",
       "title": "Service Rating Survey",
       "sequences": [],
       "is_archived": false,
       "is_published": false,
       "has_changes": false,
       "can_view": true,
       "can_edit": true
     }

.. _dialogues-put:

.. http:put:: /dialogues/(str:dialogue_id)

  Replaces the :ref:`description <data-dialogue>` of the dialogue with id
  ``dialogue_id`` with the description given in the request body and returns
  the given description, along with the dialogue's ``id`` and the ``url`` for
  accessing the dialogue's description.

  Replacing the dialogue creates a new :ref:`edit revision
  <concepts-revisions-edit>` with a `JSON patch`_ representing the instructions
  needed to change the current dialogue description to the new description
  given in the request body.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the organization that owns the project under which the
      dialogue is contained
    - ``project:admin`` for the project under which the dialogue is contained
    - ``project:write`` for the project under which the dialogue is contained

  .. _JSON Patch: http://tools.ietf.org/html/rfc6902

  .. sourcecode:: http

    PUT /dialogues/21 HTTP/1.1
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
      "url": "/dialogues/21",
      "title": "Service Rating Survey",
      "sequences": [],
      "is_archived": false,
      "is_published": false,
      "has_changes": false,
       "can_view": true,
       "can_edit": true
    }

.. warning::
  If the ``id`` of a :ref:`sequence <data-sequence>` or :ref:`block <data-block>` is changed, the API will regard the changed sequence or block as a new entity. This means all state previously associated to the sequence or block (for example, metrics and translations) will no longer be associated with it.

.. _dialogues-patch:

.. http:patch:: /dialogues/(str:dialogue_id)

  Partially updates the :ref:`description <data-dialogue>` of the dialogue with
  id ``dialogue_id`` with the :ref:`instructions <overview-partial-updates>` in
  the request body and returns the given description, along with the dialogue's
  ``id`` and the ``url`` for accessing the dialogue's description.

  Partially updating the dialogue creates a new :ref:`edit revision
  <concepts-revisions-edit>` using the provided patch instructions.

  Accessible to admins and teams with any of the following permissions:
    - ``org:admin`` for the organization that owns the project under which the
      dialogue is contained
    - ``project:admin`` for the project under which the dialogue is contained
    - ``project:write`` for the project under which the dialogue is contained

.. sourcecode:: http

   PATCH /dialogues/21 HTTP/1.1
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
     "url": "/dialogues/21",
     "title": "Service Rating Survey",
     "sequences": [{
       "id": "start",
       "title": "Start of sequence",
       "blocks": []
     }],
     "is_archived": false,
     "is_published": false,
     "has_changes": false,
     "can_view": true,
     "can_edit": true
   }

.. warning::
  If the ``id`` of a :ref:`sequence <data-sequence>` or :ref:`block <data-block>` is changed, the API will regard the changed sequence or block as a new entity. This means all state previously associated to the sequence or block (for example, metrics and translations) will no longer be associated with it.


Archiving dialogues
~~~~~~~~~~~~~~~~~~~
A dialogue can be archived by setting ``is_archived`` to ``true`` when :ref:`replacing <dialogues-put>` or :ref:`partially updating <dialogues-patch>` the dialogue description. The dialogue is still accessible via the api, but will no longer be triggered by any events associated to it.

.. TODO ^ reference events if and when they are documented

.. _revisions:

Revisions
---------

.. http:get:: /dialogues/(str:dialogue_id)/revisions/

  Retrieves the :ref:`revisions <data-revision>` of dialogue ``dialogue_id``.

  .. sourcecode:: http

     GET /dialogues/21/revisions/ HTTP/1.1

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

.. http:post:: /dialogues/(str:dialogue_id)/revisions/

  Creates a new revision for dialogue ``dialogue_id`` using the
  :ref:`description <data-revision>` given in the request body and returns the
  created revisions's description, along with the generated ``id`` field and
  ``url`` field for accessing the revision description.

  Creating a new revision updates the dialogue's description. Any new requests
  to :ref:`retrieve <dialogues-get>` the dialogue will return a dialogue
  :ref:`description <data-dialogue>` with the new revision applied.

  .. sourcecode:: http

     POST /dialogues/21/revisions/ HTTP/1.1
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

  It is also possible to create revisions in bulk by providing an array of
  revisions. In this case, an array of revision descriptions will be returned:

  .. sourcecode:: http

     POST /dialogues/21/revisions/ HTTP/1.1
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

.. note::
  Creating revisions in bulk is done atomically. If one of the given revisions cannot be created, none of the given revisions will be created.


Releases
--------

.. http:get:: /dialogues/(str:dialogue_id)/releases/

  Retrieves the :ref:`descriptions <data-release>` of the :ref:`releases
  <concepts-releases>` of dialogue ``dialogue_id``.

  .. sourcecode:: http

    GET /projects/23/dialogues/21/releases/ HTTP/1.1

  .. sourcecode:: http

    HTTP/1.1 200 OK
    Content-Type: application/json

    [{
      "id": "1",
      "number": 1,
      "url": "/releases/1",
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

.. http:get:: /releases/(str:release_id)

  Retrieves the :ref:`description <data-release>` for the release with id
  ``release_id``.

  .. sourcecode:: http

      GET /releases/44 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "1",
       "number": 1,
       "url": "/releases/1",
       "revision_id": "7",
       "created": 1460022608855
     }

  If the release isn't found, a ``404`` response will be given. The response
  body's ``details`` object contains the ``id`` and ``dialogue_id`` given in
  the request.

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

.. http:post:: /dialogues/(str:dialogue_id)/releases/

  Creates a new release for dialogue ``dialogue_id`` using the
  :ref:`description <data-release>` given in the request body and returns the
  created releases's description, along with the generated release ``id`` field
  and ``url`` field for accessing the release description.

  .. sourcecode:: http

    POST /dialogues/21/releases/ HTTP/1.1
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
      "url": "/releases/1"
    }

.. _channels:

Channels
--------

.. http:get:: /organizations/:organization_id/channels/

  Retrieves the :ref:`descriptions <data-channel>` of all channels contained by
  the organization with id ``organization_id``.

  .. sourcecode:: http

     GET /channels/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "23",
       "url": "/channels/23",
       "project_id": "21",
       "title": "@foo",
       "address": "@foo",
       "type": "twitter",
       "is_available": true,
       "provider": {
         "id": "21",
         "title": "Twitter"
       }
     }]

.. http:get:: /channels/(str:channel_id)

  Retrieves the :ref:`description <data-channel>` of the channel with the id
  ``channel_id``.

  .. sourcecode:: http

     GET /channels/23 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "url": "/channels/23",
       "project_id": "21",
       "title": "@foo",
       "address": "@foo",
       "type": "twitter",
       "is_available": true,
       "provider": {
         "id": "21",
         "title": "Twitter"
       }
     }

.. _channels-put:

.. http:put:: /channels/(str:channel_id)

  Replaces the :ref:`description <data-channel>` of the channel with id
  ``channel_id`` with the description given in the request body and returns the
  given description, along with the channel's ``id`` and the ``url`` for
  accessing the channel's description.

  .. sourcecode:: http

     PUT /channels/23 HTTP/1.1
     Content-Type: application/json

     {
       "id": "23",
       "project_id": "17",
       "url": "/channels/23",
       "title": "@foo",
       "address": "@foo",
       "type": "twitter",
       "is_available": true
     }

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "project_id": "17",
       "url": "/channels/23",
       "title": "@foo",
       "address": "@foo",
       "type": "twitter",
       "is_available": true
     }

.. _channels-patch:

.. http:patch:: /channels/(str:channel_id)

  Partially updates the :ref:`description <data-channel>` of the channel with
  id ``channel_id`` using the :ref:`instructions <overview-partial-updates>`
  given in the request body and returns the given channel's description, along
  with the channel's ``id`` and the ``url`` for accessing the channel's
  description.

  .. sourcecode:: http

     PATCH /channels/23 HTTP/1.1
     Content-Type: application/json-patch+json

     [{
       "op": "replace",
       "path": "/project_id",
       "value": "17"
     }]

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "23",
       "project_id": "17",
       "url": "/channels/23",
       "title": "@foo",
       "address": "@foo",
       "type": "twitter",
       "is_available": true
     }

Channel access
~~~~~~~~~~~~~~
A channel can only be accessible by one project at a time. A channel can be made accessible to a project by setting ``project_id`` to the project's id when :ref:`replacing <channels-put>` or :ref:`partially updating <channels-patch>` the channel description.

Providers
---------

.. http:get:: /organizations/:organization_id/providers/

  Retrieves the :ref:`summaries <data-provider-summary>` of all providers
  contained under the organization with id ``organization_id``.

  .. sourcecode:: http

     GET /providers/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     [{
       "id": "21",
       "url": "/providers/21",
       "title": "Twitter"
     }, {
       "id": "22",
       "url": "/providers/22",
       "title": "MTN Nigeria"
     }]

.. http:get:: /providers/(str:provider_id)

  Retrieves the :ref:`description <data-provider>` of the provider with the id
  ``provider_id``.

  .. sourcecode:: http

     GET /providers/21 HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "id": "21",
       "url": "/providers/21",
       "title": "Twitter"
       "channels": [{
         "id": "23",
         "url": "/channels/23",
         "project_id": 21,
         "title": "@foo",
         "address": "@foo",
         "type": "twitter",
         "is_available": true
       }]
     }

.. _data:

Data Structures
---------------

Users
~~~~~

.. _data-user-summary:

User Summary
************

.. literalinclude:: ../schemas/user/summary.yml
  :language: yaml

.. _data-auth-user-summary:

Authenticated User Summary
**************************

.. literalinclude:: ../schemas/user/auth-user-summary.yml
  :language: yaml

Teams
~~~~~

.. _data-team:

Team
****

.. literalinclude:: ../schemas/team/team.yml
  :language: yaml

.. _data-team-summary:

Team Summary
************

.. literalinclude:: ../schemas/team/summary.yml
  :language: yaml

Projects
~~~~~~~~

.. _data-project:

Project
*******

.. literalinclude:: ../schemas/project/project.yml
  :language: yaml

.. _data-project-summary:

Project Summary
***************

.. literalinclude:: ../schemas/project/summary.yml
  :language: yaml

.. _data-dialogues:

Dialogues
~~~~~~~~~

.. _data-dialogue:

Dialogue
********

.. literalinclude:: ../schemas/dialogue/dialogue.yml
  :language: yaml

.. _data-dialogue-summary:

Dialogue Summary
****************

.. literalinclude:: ../schemas/dialogue/summary.yml
  :language: yaml

.. _data-sequence:

Sequence
********

.. literalinclude:: ../schemas/dialogue/sequence.yml
  :language: yaml

.. _data-block:

Block
*****

.. note::
  A block's ``properties`` object is validated against a schema corresponding to the block's type (represented by the ``type`` field).

.. literalinclude:: ../schemas/dialogue/block.yml
  :language: yaml

.. _data-symbol:

Symbol
******

.. literalinclude:: ../schemas/dialogue/symbol.yml
  :language: yaml

Revisions
~~~~~~~~~

.. _data-revision:

Revision
********

.. literalinclude:: ../schemas/revision/revision.yml
  :language: yaml

.. _data-revision-edit:

Edit
^^^^

.. literalinclude:: ../schemas/revision/edit.yml
  :language: yaml

.. _data-revision-revert:

Revert
^^^^^^

.. literalinclude:: ../schemas/revision/revert.yml
  :language: yaml

Releases
~~~~~~~~

.. _data-release:

Release
*******

.. literalinclude:: ../schemas/release.yml
  :language: yaml

.. _data-permissions:

Permissions
~~~~~~~~~~~

.. literalinclude:: ../schemas/permission/permission.yml
  :language: yaml

Channels
~~~~~~~~

.. _data-channel:

Channel
*******

.. literalinclude:: ../schemas/channel/channel.yml
  :language: yaml

.. _data-channel-summary:

Channel Summary
***************

.. literalinclude:: ../schemas/channel/summary.yml
  :language: yaml

.. _data-provider:

Providers
~~~~~~~~~

.. literalinclude:: ../schemas/provider/provider.yml
  :language: yaml

.. _data-provider-summary:

Provider Summary
****************

.. literalinclude:: ../schemas/provider/summary.yml
  :language: yaml


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
