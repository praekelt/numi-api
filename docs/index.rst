numi api documentation
======================


.. toctree::
   :maxdepth: 2


Overview
--------

Format
~~~~~~

All response bodies are sent as JSON objects.

.. TODO example success response once we have an API endpoint

Where specified, query string parameters can be provided.

.. TODO example request once we have an API endpoint that accepts parameters

Request bodies for ``POST``, ``PUT``, ``PATCH`` and ``DELETE`` requests are expected to be JSON objects.

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

Partial updates
~~~~~~~~~~~~~~~

Partial update requests should provide instructions for how a resource should be modified according to the structure proposed in `RFC 6902`_. Note that partial updates are *atomic*, so if any of the given instructions fail, none of the instructures will be carried out.

.. _RFC 6902: http://tools.ietf.org/html/rfc6902#section-4.6

.. TODO patch example once we have an API endpoint supporting this


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
         "path": "foo/0/baz",
         "message": "'quux' is a required property"
       }, {
         "type", "type",
         "path": "bar",
         "message": "23 is not of type 'string'"
       }]
     }
   }


Data Structures
---------------

.. _data-dialogues:

Dialogues
~~~~~~~~~
A dialogue comprises the entire set of steps to follow when a user interacts with a service. It contains a set of :ref:`Sequences <data-sequences>`, each of which contain a set of :ref:`Blocks <data-blocks>`.

Dialogue Schema
***************

.. literalinclude:: ../schemas/dialogue.yml
  :language: yaml


.. _data-sequences:

Sequences
~~~~~~~~~
A sequence is a set of steps that follow one after the other, where each step corresponds to a :ref:`Block <data-blocks>`. A user moves from one sequence to another if different steps need to be followed based on certain conditions.

For example, a dialogue could contain a sequence with a block that asks the user a multiple choice question and moves the user to a different sequence that corresponds to their choice.


Sequence Schema
***************

.. literalinclude:: ../schemas/sequence.yml
  :language: yaml


.. _data-blocks:

Blocks
~~~~~~
A block is a single step to follow when interacting with the user. This step may be, for example, a screen asking the user a question, or a step not visible to the user, for example, registering the user with a service.

Block Schema
************
Note that a block's ``properties`` object is validated against a schema corresponding to the block's type (represented by the ``type`` field).

.. literalinclude:: ../schemas/block.yml
  :language: yaml


.. _data-symbol:

Symbols
~~~~~~~
Symbols are used in a :ref:`Dialogue <data-dialogues>` data structure as programmatically-usable strings. Their main use is for identifying and referencing sequences, blocks and block types.

Symbol Schema
*************

.. literalinclude:: ../schemas/symbol.yml
  :language: yaml


.. TODO Projects endpoints


Dialogues
---------

.. http:get:: /projects/(str:project_id)/dialogues/

  Retrieves a summary of every dialogue contained in the project with id
  ``:project_id``.

  .. sourcecode:: http

      GET /projecs/23/dialogues/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 G00 OK
     Content-Type: application/json

     {
       "dialogues": [{
         "id": "21",
         "title": "Service Rating Survey",
         "url": "/projects/23/dialogues/21",
         "is_archived": false
       }]
     }

  :>json string id: The dialogue's identifier
  :>json string title: The dialogue's human-readable title
  :>json string url: API url for accessing the dialogue description.
  :>json boolean is_archived: Flag representing whether this dialogue has been archived.


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
       "is_archived": false
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
       "is_archived": false
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
       "is_archived": false
     }

.. warning::
  If the ``id`` of a :ref:`sequence <data-sequences>` or :ref:`block <data-blocks>` is changed, the API will regard the changed sequence or block as a new entity. This means all state previously associated to the sequence or block (for example, metrics and translations) will no longer be associated with it.


Archiving dialogues
~~~~~~~~~~~~~~~~~~~
A dialogue can be archived by setting ``is_archived`` to ``true`` when :ref:`updating <dialogues-put>` the dialogue description. The dialogue is still accessible via the api, but will no longer be triggered by any events associated to it.

.. TODO ^ reference channels once they exist


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
