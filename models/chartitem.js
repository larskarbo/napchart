/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chartitem', { 
    chartid: {
      type: 'CHAR(5)',
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
    },
    end: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
    }
  });
};
