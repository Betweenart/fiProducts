/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash'),
  figures = [],
  err = false,
  handleError = (res, err) => {
    return res.send(500, err);
  },
  fs = require("fs"),
  _ = require('lodash'),
  file = __dirname + "/../../data/fiProducts.sqlite",
  knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: file
    }
  });

/**
 * Get list of products
 * @method index
 */
exports.index = (req, res) => {
  knex.select().table('products')
    .asCallback(function (err, rows) {
      if (err) return handleError(res, err);
      var response = [];
      _.each(rows, function (row) {
        response.push(row);
      });

      // return json response
      res.json(response);
    });
};

/**
 * Get a single figure
 * @method show
 */
exports.show = (req, res) => {
  knex.select().table('products')
    .where('id', req.params.id)
    .asCallback(function (err, rows) {
      if (err) return handleError(res, err);
      var response = null;
      _.each(rows, function (row) {
        response = row;
      });

      if (!response) {
        return res.send(404);
      }

      // return json response
      res.json(response);
    });
};

/**
 * Creates a new product in the DB.
 * @method create
 */
exports.create = (req, res) => {
  var toInsert = {
    id: null,
    name: req.body.name || '',
    info: req.body.info || 'no info',
    type: req.body.type || 'Action Figure',
    imageUrl: req.body.imageUrl || 'no image',
    price: req.body.price || 0.00,
    currency: req.body.currency || '£',
    stock: req.body.stock || 0
  };

  knex('products').insert(toInsert)
    .asCallback(function (err, rows) {
      if (err) return handleError(res, err);
      knex.select().table('products')
        .where('id', rows[0])
        .asCallback(function (err, rows) {
          if (err) return handleError(res, err);
          var response = null;
          _.each(rows, function (row) {
            response = row;
          });

          if (!response) {
            return res.send(404);
          }

          // return json response
          res.json(response);
        });
    });
};

/**
 * Updates an existing product in the DB.
 * @method update
 */
exports.update = (req, res) => {
  // get rid of id if was passed in body
  if (req.body.id) {
    delete req.body.id;
  }

  knex('products')
    .where('id', parseInt(req.params.id, 10))
    .update(req.body)
    .asCallback(function (err, rows) {
      if (err) return handleError(res, err);

      var response = rows;
      console.dir(rows);

      if (!response) {
        return res.send(404);
      }

      // return json response
      res.json(response);
    });
};

/**
 * Deletes a product from the DB.
 * @method destroy
 */
exports.destroy = (req, res) => {
  knex('products')
    .where('id', parseInt(req.params.id, 10))
    .update(req.body)
    .asCallback(function (err, rows) {
      if (err) return handleError(res, err);

      var response = rows;
      console.dir(rows);

      if (!response) {
        return res.send(404);
      }

      // return json response
      res.json(response);
    });
};
