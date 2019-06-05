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

// GET Events Medalist Endpoint
router.get('/:id/medalists', async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    const eventId = req.params.id;
    const event = await Event.findOne({
      where: {
        id: eventId
      }
    })

    await OlympianEvent.findAll({
      where: {
        EventId: eventId,
        medal: {[Op.not]: 'NA'}
      },
      include: [{
        model: Olympian,
        attributes: ['name', 'team', 'age']
      }]
    })
    .then(olympianEvents => {
      let medalists = olympianEvents.map(function(oe){
        return {"name": oe.Olympian.name,
        "team": oe.Olympian.team,
        "age": oe.Olympian.age,
        "medal": oe.medal}
      })

      let medalistFormatted = {
        "event": event.name,
        "medalists": medalists
      }
      res.status(200).send(medalistFormatted)
    })
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
})

module.exports = router;
