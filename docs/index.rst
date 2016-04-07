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


Concepts
~~~~~~~~

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

Data Structures
---------------

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

.. _data-dialogue-summaries:

Dialogue Summaries
~~~~~~~~~~~~~~~~~~

.. literalinclude:: ../schemas/dialogue/summary.yml
  :language: yaml


.. TODO Projects endpoints

.. _dialogues:

Dialogues
---------

.. http:get:: /projects/(str:project_id)/dialogues/

  Retrieves a :ref:`summary <data-dialogue-summaries>` of every dialogue
  contained in the project with id ``:project_id``.

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

Creates a new dialogue under the project with the id ``project_id`` using the :ref:`dialogue description <data-dialogues>` given in the request body and returns the created dialogue's description, along with the generated dialogue ``id`` field and ``url`` field for accessing the dialogue description.

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

Replaces the :ref:`description <data-dialogues>` of the dialogue with id ``dialogue_id`` in the project with id ``project_id`` with the description given in the request body and returns the given description, along with the dialogue's ``id`` and the ``url`` for accessing the dialogue's description.

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

Partially updates the :ref:`description <data-dialogues>` of the dialogue with id ``dialogue_id`` in the project with id ``project_id`` with the :ref:`instructions <overview-partial-updates>` in the request body and returns the given description, along with the dialogue's ``id`` and the ``url`` for accessing the dialogue's description.

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


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
