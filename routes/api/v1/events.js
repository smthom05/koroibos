const express = require("express");
const router = express.Router();
const pry = require('pryjs');
const Olympian = require('../../../models').Olympian;
const Event = require('../../../models').Event;
const OlympianEvent = require('../../../models').OlympianEvent;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET Events Endpoint
router.get('/', async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    const events = await Event.findAll({
      attributes: [
        'sport',
        [Sequelize.fn('array_agg', Sequelize.col('name')), 'events']
      ],
      group: ['Event.sport']
    });
    res.status(200).send({ events });
  } catch (error) {
    res.status(404).send({ error });
  }
})

module.exports = router;
