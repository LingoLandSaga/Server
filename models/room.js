'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Player)
    }
  }
  Room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Room name is required"
        },
        notEmpty: {
          msg: "Room name is required"
        }
      }
    },
    winner: {
      type: DataTypes.STRING,
      defaultValue: "TBD"
    },
    playerCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};