/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chart', { 
    chartid: {
      type: 'CHAR(5)',
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    visits: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: 0
    },
    IP: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  });
};
