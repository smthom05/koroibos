'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    team: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.hasMany(models.OlympianEvent)
    Olympian.belongsToMany(models.Event, {through: models.OlympianEvent, foreignKey: 'OlympianId'});
  };
  return Olympian;
};
