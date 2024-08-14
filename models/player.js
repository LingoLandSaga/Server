'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Player name is required"
        },
        notNull: {
          msg: "Player name is required"
        }
      }
    },
    lives: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Roomd ID is required"
        },
        notNull: {
          msg: "Roomd ID is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};