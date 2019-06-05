const express = require("express");
const router = express.Router();
const pry = require('pryjs');
const Olympian = require('../../../models').Olympian;
const Event = require('../../../models').Event;
const OlympianEvent = require('../../../models').OlympianEvent;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET Olympian Stats Endpoint
router.get('/', async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    var maleWeight = 0;
    var femaleWeight = 0;
    var males = 0;
    var females = 0;
    var totalAge = 0;
    var olympians = await Olympian.findAll();

    for (var i = 0; i < olympians.length; i++){
      totalAge += olympians[i].age
      if (olympians[i].sex === 'M') {
        maleWeight += olympians[i].weight
        males ++
      } else {
        femaleWeight += olympians[i].weight
        females ++
      }
    }

    let formattedStats = {
      "total_competing_olympians": olympians.length,
      "average_weight": {
        "unit": "kg",
        "male_olympians": Math.round(maleWeight / males),
        "female_olympians": Math.round(femaleWeight / females),
      },
      "average_age": Math.round(totalAge / olympians.length)
    }

    res.status(200).send({"olympian_stats": formattedStats})
  } catch (error) {
    res.status(404)
  }
})


module.exports = router;
