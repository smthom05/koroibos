const fs = require('fs');
const csv = require('fast-csv');
const pry = require('pryjs')
const Olympian = require('../models').Olympian;
const Event = require('../models').Event;
const OlympianEvent = require('../models').OlympianEvent;

let counter = 0;
let csvStream = csv.fromPath("./data/olympians.csv", {headers: true})
  .on('data', function(record) {

    csvStream.pause();

    let name = record.Name;
    let sex = record.Sex;
    let age = record.Age;
    let weight = record.Weight;
    let team = record.Team;
    let sport = record.Sport;
    let event = record.Event;
    let medal = record.Medal;

    if (weight == 'NA') {
      weight = null
    }


    Event.findOrCreate({
      where: {
        name: event,
        sport: sport
      }
    })
    .then(event => {
      Olympian.findOrCreate({
        where: {
          name: name,
          age: age,
          sex: sex,
          weight: weight,
          team: team,
          sport: sport
        }
      })
      .then(olympian => {
        var olympianId = olympian[0].id;
        var eventId = event[0].id;
        OlympianEvent.findOrCreate({
          where: {
            EventId: eventId,
            OlympianId: olympianId,
            medal: medal
          }
        })
      })
    })
    counter ++;
    csvStream.resume();
  })
  .on("end", function(end){
        console.log(`Imported ${counter} files`);
  })
  .on("error", function(err){
    console.log(err);
  })

setTimeout(function() {
  process.exit();
}, 35000);
