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
  figures = [
    {
      id: 1,
      type: 'Action Figure',
      name: 'Shadow Shaman',
      info: 'Born in the Bleeding Hills, Rhasta was just a starving youngling when picked up by a travelling con-man. For two pins of copper, the old con-man would tell your fortune. For three, he\'d castrate your pig, for five, he\'d circumcise your sons. For a good meal, he\'d don his shaman garb, read from his ancient books, and lay a curse upon your enemies. His strange new youngling, part hill troll, part...something else, worked as assistant and lent an air of the exotic to the con-man\'s trade. ',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/shadow_shaman_full.png?v=3018418?v=3018418',
      price: 38.99,
      currency: '£',
      stock: 12
    }, {
      id: 2,
      type: 'Action Figure',
      name: 'Pudge',
      info: 'In the Fields of Endless Carnage, far to the south of Quoidge, a corpulent figure works tirelessly through the night--dismembering, disembowelling, piling up the limbs and viscera of the fallen that the battlefield might be clear by dawn. In this cursed realm, nothing can decay or decompose; no corpse may ever return to the earth from which it sprang, no matter how deep you dig the grave.',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/pudge_full.png?v=3018418?v=3018418',
      price: 38.00,
      currency: '£',
      stock: 16
    }, {
      id: 3,
      type: 'Action Figure',
      name: 'Lion',
      info: 'Once a Grandmaster of the Demon Witch tradition of sorcery, Lion earned fame among his brethren for fighting on the side of light and righteousness. But adulation corrupts. With powers surpassed only by his ambition, the mage was seduced by a demon and turned to evil, trading his soul for prestige.',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/lion_full.png?v=3018418?v=3018418',
      price: 32.00,
      currency: '£',
      stock: 11
    }, {
      id: 4,
      type: 'Action Figure',
      name: 'Sand King',
      info: 'The sands of the Scintillant Waste are alive and sentient--the whole vast desert speaks to itself, thinking thoughts only such a vastness can conceive. But when it needs must find a form to communicate with those of more limited scope, it frees a fragment of itself, and fills a carapace of magic armor formed by the cunning Djinn of Qaldin.',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/sand_king_full.png?v=3018418?v=3018418',
      price: 36.50,
      currency: '£',
      stock: 15
    }, {
      id: 5,
      type: 'Action Figure',
      name: 'Tiny',
      info: 'Coming to life as a chunk of stone, Tiny\'s origins are a mystery on which he continually speculates. He is a Stone Giant now, but what did he used to be? A splinter broken from a Golem\'s heel? A shard swept from a gargoyle-sculptor\'s workshop? A fragment of the Oracular Visage of Garthos?',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/tiny_full.png?v=3018418?v=3018418',
      price: 29.99,
      currency: '£',
      stock: 12
    }, {
      id: 6,
      type: 'Action Figure',
      name: 'Templar Assassin',
      info: 'Lanaya, the Templar Assassin, came to her calling by a path of curious inquiry. Possessed of a scientific bent, she spent her early years engaged in meticulous study of nature\'s laws--peering into grimoires of magic and alchemy, recreating experiments from charred fragments of the Violet Archives, and memorizing observations of the Keen recordkeepers. ',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/templar_assassin_full.png?v=3018418?v=3018418',
      price: 34.50,
      currency: '£',
      stock: 16
    }, {
      id: 7,
      type: 'Action Figure',
      name: 'Phoenix',
      info: 'Alone across an untouched darkness gleamed the Keeper\'s first sun, a singular point of conscious light fated to spread warmth into the empty void. Through aeons beyond count, this blinding beacon set to coalescing its incalculable energy before bursting forth the cataclysmic flare of supernova. ',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/phoenix_full.png?v=3018418?v=3018418',
      price: 41.00,
      currency: '£',
      stock: 4
    }, {
      id: 8,
      type: 'Action Figure',
      name: 'Slark',
      info: 'Little known to the inhabitants of the dry world, Dark Reef is a sunken prison where the worst of the sea-bred are sent for crimes against their fellows. It is a razor barbed warren full of murderous slithereen, treacherous Deep Ones, sociopathic meranths. In this dim labyrinth, patrolled by eels and guarded by enormous anemones, only the vicious survive.',
      imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/slark_full.png?v=3018418?v=3018418',
      price: 34.00,
      currency: '£',
      stock: 9
    }
  ],
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


// Get list of products
exports.index = (req, res) => {
  console.log(req.body);

  if (err) {
    return handleError(res, err);
  }

  // TODO get from DB
  res.json(200, figures);
};

// Get a single figure
exports.show = (req, res) => {
  if (err) {
    return handleError(res, err);
  }

  // TODO get from DB
  var product = [{
    id: 8,
    type: 'Action Figure',
    name: 'Slark',
    info: 'Little known to the inhabitants of the dry world, Dark Reef is a sunken prison where the worst of the sea-bred are sent for crimes against their fellows. It is a razor barbed warren full of murderous slithereen, treacherous Deep Ones, sociopathic meranths. In this dim labyrinth, patrolled by eels and guarded by enormous anemones, only the vicious survive.',
    imageUrl: 'http://cdn.dota2.com/apps/dota2/images/heroes/slark_full.png?v=3018418?v=3018418',
    price: 34.00,
    currency: '£',
    stock: 9
  }];

  if (!product) {
    return res.send(404);
  }

  res.json(200, product);
};

// Creates a new product in the DB.
exports.create = (req, res) => {
  console.log(req.body);

  if (err) {
    return handleError(res, err);
  }

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

// Updates an existing guest in the DB.
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

// Deletes a guest from the DB.
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
