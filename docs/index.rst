numi api documentation
======================

Contents:

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
| PUT    | Used to replace a resouce                                  |
+--------+------------------------------------------------------------+
| PATCH  | Used to partially update a resource with fields given in   |
|        | the request body                                           |
+--------+------------------------------------------------------------+
| DELETE | Used to delete a resource                                  |
+--------+------------------------------------------------------------+

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
     "message": "Invalid JSON in request body"
   }


Two client errors common to API endpoints expecting a request body are **parsing errors** and **validation errors**.

Parsing errors
**************

If the data provided in the request body is invalid JSON, a ``400 Bad Request`` response will be given:

.. sourcecode:: http

   HTTP/1.1 400 Bad Request
   Content-Type: application/json

   {
     "type": "parse_error",
     "message": "Invalid JSON in request body"
   }


Validation errors
*****************

If the data provided in the request body is valid JSON, but the data does not
fit the schema for that particular request body, a ``422 Unprocessable Entity``
response will be given.

The ``details`` object contains an array of ``errors`` detailing why validation
failed. Each error object contains a programmitically-usable ``type`` string
representing the type of validation error, a ``path`` string pointing to where
in the given object validation failed, and a human readable ``message`` string
describing the error.

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
         "path": "foo.0.baz",
         "message": "'quux' is a required property"
       }, {
         "type", "type",
         "path": "bar",
         "message": "23 is not of type 'string'"
       }]
     }
   }


.. TODO Projects endpoints


Dialogues
---------

.. http:get:: /projects/(str:project_id)/dialogues/

  Retrieves a summary of every dialogue contained in the project with id
  ``:project_id``.

  .. sourcecode:: http

      GET /projecs/23/dialogues/ HTTP/1.1

  .. sourcecode:: http

     HTTP/1.1 200 OK
     Content-Type: application/json

     {
       "dialogues": [{
         "id": "21",
         "title": "Service Rating Survey",
         "url": "/projects/23/dialogues/21"
       }]
     }

  :>json string id: The dialogue's identifier
  :>json string title: The dialogue's human-readable title
  :>json string url: The dialogue's api url


Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
