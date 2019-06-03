'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('Sport', {
    name: DataTypes.STRING
  }, {});
  Sport.associate = function(models) {
    Sport.hasMany(models.Event)
  };
  return Sport;
};
