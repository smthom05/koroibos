'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    SportId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Sport, {foreignKey: 'SportId'});
    Event.belongsToMany(models.Olympian, {through: models.OlympianEvent, foreignKey: 'EventId'});
    Event.hasMany(models.OlympianEvent)
  };
  return Event;
};
