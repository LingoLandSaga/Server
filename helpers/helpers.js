const { Op } = require("sequelize")
const { Word, Room, Player } = require("../models")

class Helper {
  static async getRooms(name, isFinished = false) {
    try {
      let options = {
        where: {
          isFinished: {
            [Op.eq]: false
          }
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      }
      if (name) {
        options.where.name = {
          [Op.iLike]: `${name}`
        }
      }
      if (isFinished) {
        options.where.isFinished = {
          [Op.eq]: isFinished
        }
      }
      const rooms = await Room.findAll(options)
      return rooms
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async makeRoom(name, username) {
    try {
      if (!name) {
        throw { name: "RoomNameEmpty" }
      }
      if (!username) {
        throw { name: "UserNameEmpty" }
      }
      const createdRoom = await Room.create({ name })
      const createdPlayer = await Player.create({ RoomId: createdRoom.id, username: username })
      const data = { room: createdRoom, player: createdPlayer }
      return (data);
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async joinRoom(roomId, username) {
    try {
      if (!roomId) {
        throw { name: "RoomIdEmpty" }
      }
      const foundRoom = await Room.findByPk(roomId)
      if (!foundRoom) {
        throw { name: "RoomNotFound" }
      }
      if (foundRoom.playerCount > 4) {
        throw { name: "RoomIsFull" }
      }
      if (!username) {
        throw { name: "UserNameEmpty" }
      }
      const createdPlayer = await Player.create({ RoomId: foundRoom.id, username: username })
      if (createdPlayer) {
        await Room.increment("playerCount", {
          where: {
            id: foundRoom.id
          }
        })
      }

      return (createdPlayer)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

module.exports = Helper