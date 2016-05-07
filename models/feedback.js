/* jshint indent: 2 */

function randomValue(){
    return Math.floor(Math.random() * 10000000)
}

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    token: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: randomValue
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
