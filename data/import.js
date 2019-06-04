const fs = require('fs');
const csv = require('fast-csv');
const pry = require('pryjs')
const Olympian = require('../models').Olympian;
const Event = require('../models').Event;
const Sport = require('../models').Sport;
const OlympianSport = require('../models').OlympianSport;

let counter = 0;
let csvStream = csv.fromPath("./olympians.csv", {headers: true})
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

    Sport.findOrCreate({
      where: {
        name: sport
      }
    })
    .then(sport => {
      Event.findOrCreate({
        where: {
          name: event,
          SportId: sport[0].id
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
          OlympianEvent.create({
            where: {
              EventId: event[0].id,
              OlympianId: olympian[0].id,
              medal: medal
            }
          })
        })
      })
    })
  })
  counter ++;
  csvStream.resume();
  .on("end", function(){
        console.log(`Imported ${counter} files`);
  })
  .on("error", function(err){
    console.log(err);
  })

setTimeout(function() {
  process.exit();
}, 30000);
