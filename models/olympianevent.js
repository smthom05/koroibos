'use strict';
module.exports = (sequelize, DataTypes) => {
  const OlympianEvent = sequelize.define('OlympianEvent', {
    medal: DataTypes.STRING
  }, {});
  OlympianEvent.associate = function(models) {
    // associations can be defined here
  };
  return OlympianEvent;
};