const { Op } = require('sequelize');
const { Word, Room, Player } = require('../models');
const { options } = require('pg/lib/defaults');
class HomeController {
  static async home(req, res, next) {
    try {
      res.send("Welcome")
    } catch (error) {
      next(error)
    }
  }

  static async randomWords(req, res, next) {
    try {
      const randomWord = Math.ceil(Math.random() * 108047);
      const { id, word } = await Word.findByPk(randomWord);
      const randomShow = Math.floor(Math.random() * Math.floor(word.length / 2));
      const shortWord = word.slice(0, randomShow + 1)
      res.status(200).json({ id, word, shortWord });
    } catch (error) {
      next(error)
    }
  }

  static async checkWord(req, res, next) {
    try {
      let { answer, question } = req.body;
      answer = answer.toLowerCase();
      question = question.toLowerCase();
      if (!answer.includes(question)) throw { name: 'AnswerNotValid' }

      const findWord = await Word.findOne({
        where: {
          word: {
            [Op.iLike]: answer
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (!findWord) throw { name: 'WordNotFound' };
      res.status(200).json(findWord);
    } catch (error) {
      next(error)
    }
  }

  static async getRooms(req, res, next) {
    try {
      let { name, isFinished } = req.query
      let options = {
        where: {
          isFinished: {
            [Op.eq]: false
          }
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: {
          model: Player
        }
      }
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`
        }
      }
      if (isFinished) {
        options.where.isFinished = {
          [Op.eq]: isFinished
        }
      }
      const rooms = await Room.findAll(options)
      res.status(200).json(rooms)
    } catch (error) {
      next(error)
    }
  }

  static async makeRoom(req, res, next) {
    try {
      const { name, username } = req.body
      if (!name) {
        throw { name: "RoomNameEmpty" }
      }
      if (!username) {
        throw { name: "UserNameEmpty" }
      }
      const createdRoom = await Room.create({ name })
      const createdPlayer = await Player.create({ RoomId: createdRoom.id, username: username })
      const data = { room: createdRoom, player: createdPlayer }
      res.status(201).json({ message: "Room and player created!", data });
    } catch (error) {
      next(error);
    }
  }
  static async joinRoom(req, res, next) {
    try {
      const { roomId } = req.params
      const { username } = req.body
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
      res.status(201).json({ message: "Player joined room!", player: createdPlayer });
    } catch (error) {
      next(error);
    }
  }

  static async roomDetail(req, res, next) {
    try {
      const { roomId } = req.params;
      const data = await Room.findByPk(roomId, {
        include: {
          model: Player,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updateRoomStatus(req, res, next) {
    try {
      const { roomId } = req.params
      await Room.update({ isFinished: true }, {
        where: {
          id: roomId
        }
      })
      res.status(200).json({ message: "Game has finished, thank you for playing" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HomeController