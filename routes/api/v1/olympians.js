const express = require("express");
const router = express.Router();
const pry = require('pryjs');
const Olympian = require('../../../models').Olympian;
const Event = require('../../../models').Event;
const OlympianEvent = require('../../../models').OlympianEvent;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET All Olympians Endpoint
router.get('/', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.query.age === "youngest") {
    Olympian.min("age")
    .then(age => {
      Olympian.findAll({
        attributes: ['name', 'team', 'age', 'sport'],
        where: {age: age},
        include: [{
          model: OlympianEvent,
          where: {
            medal: {[Op.not]: 'NA'}
          },
          required: false
        }]
      })
      .then(olympians => {
        return serializeOlympians(olympians)
      })
      .then(serializedOlympians => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send({olympians: serializedOlympians})
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json')
        res.status(404).send({error})
      })
    })
  } else if (req.query.age === 'oldest') {
    Olympian.max("age")
    .then(oldestAge => {
      Olympian.findAll({
        attributes: ['name', 'team', 'age', 'sport'],
        where: {age: oldestAge},
        include: [{
          model: OlympianEvent,
          where: {
            medal: {[Op.not]: 'NA'}
          },
          required: false
        }
      ]
      })
      .then(olympians => {
        return serializeOlympians(olympians)
      })
      .then(serializedOlympians => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send({olympians: serializedOlympians})
      })
      .catch(error => {
        res.setHeader('Content-Type', 'application/json')
        res.status(404).send({error})
      })  
    })
  } else {
    Olympian.findAll({
      attributes: ['name', 'team', 'age', 'sport'],
      include: [{
        model: OlympianEvent,
        where: {
          medal: {[Op.not]: 'NA'}
        },
        required: false
        }
      ]
    })
    .then(olympians => {
      return serializeOlympians(olympians)
    })
    .then(serializedOlympians => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send({olympians: serializedOlympians})
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json')
      res.status(404).send({error})
    })
  }
})


// Helper Methods

function serializeOlympians(olympians) {
  return olympians.map(function (olympian){
    let olympianSerializer = {
      name: olympian.name,
      team: olympian.team,
      age: olympian.age,
      sport: olympian.sport,
      total_medals_won: olympian.OlympianEvents.length
    }
    return olympianSerializer
  })
}

module.exports = router;
