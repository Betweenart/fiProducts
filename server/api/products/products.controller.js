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
  console.log(req.body);


  // TODO create in DB and return object with proper table ID
  res.json(201, {
    id: Math.ceil(Math.random() * 99999),
    type: 'Action Figure',
    name: '',
    info: 'no info',
    imageUrl: 'no image',
    price: 0.00,
    currency: '£',
    stock: 0
  });
};

/**
 * Updates an existing product in the DB.
 * @method update
 */
exports.update = (req, res) => {
  if (req.params.id) {
    delete req.params.id;
  }

  // TODO find product
  if (err) {
    return handleError(res, err);
  }

  // TODO get from DB
  var product = {
    id: req.params.id,
    type: 'Action Figure',
    currency: '£'
  };

  if (!product) {
    return res.send(404);
  }
  var updated = _.merge(product, req.body);

  // TODO get product from DB and UPDATE
  res.json(200, product);// return updated product
};

/**
 * Deletes a product from the DB.
 * @method destroy
 */
exports.destroy = (req, res) => {
  if (err) {
    return handleError(res, err);
  }

  //TODO check in DB
  var product = {
    id: req.params.id
  };

  if (!product) {
    return res.send(404);
  }

  // TODO remove product from DB
  res.json(200, product);
};
