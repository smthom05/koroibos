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
    
  };
  return Olympian;
};
