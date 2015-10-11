/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
  {
  name : 'Create Product',
  info : 'Create a new product with name, price and description'
  }, {
  name : 'View Products',
  info : 'View products using sorting, filters and search'
  }, {
  name : 'Edit Product',
  info : 'Edit a product on the spot, ie. to change it\'s price or description etc.'
  },  {
  name : 'Remove/Delete',
  info : 'Get rid of a product for ever ;) kaboom'
  },  {
  name : 'Friendly API written on node',
  info : 'yes it is friendly - developer would join you for a whiskey'
  },{
  name : 'Build with top tools',
  info : 'Easily deploy your app to Heroku or Openshift. Automated process with Grunt. Live server on node for development and production.'
  }
  ]);
};
