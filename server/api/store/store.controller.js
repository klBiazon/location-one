/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stores              ->  index
 * POST    /api/stores              ->  create
 * GET     /api/stores/:id          ->  show
 * PUT     /api/stores/:id          ->  update
 * DELETE  /api/stores/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Store from './store.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function searchNearBy(req, res) {
  return Store.find({
      geoLocation : {
        $nearSphere : {
          $geometry: {
            type : "Point",
            coordinates : [ parseFloat(req.params.longhitude), parseFloat(req.params.latitude) ]
          },
          $minDistance: 10,
          $maxDistance: 7000
        }
      }
    }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a list of Stores
export function index(req, res) {
  return Store.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Store from the DB
export function show(req, res) {
  return Store.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Store in the DB
export function create(req, res) {
  return Store.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Store in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Store.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Store from the DB
export function destroy(req, res) {
  return Store.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
