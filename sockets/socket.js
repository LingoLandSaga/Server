const Helper = require("../helpers/helpers");
const { Word, Player, Room } = require('../models');

function setupRoom(io) {

  let question;

  io.on("connection", (socket) => {
    console.log(socket.id, '<<< SOCKET');

    socket.on('start-game', async (roomId) => {
      if (question) {
        io.to(roomId).emit('set-question', question);
      } else {
        const randomWord = Math.ceil(Math.random() * 108047);
        const { id, word } = await Word.findByPk(randomWord);
        const randomShow = Math.floor(Math.random() * Math.floor(word.length / 2));
        const shortWord = word.slice(0, randomShow + 1)
        question = shortWord;
        io.to(roomId).emit('set-question', question);
      }
    });

    socket.on('change-turn', arg => {
      console.log(arg)
      socket.to(arg.roomId).emit('set-turn', arg.playerName);
    });

    socket.on('change-question', async (arg) => {
      console.log(arg)
      const randomWord = Math.ceil(Math.random() * 108047);
      const { id, word } = await Word.findByPk(randomWord);
      const randomShow = Math.floor(Math.random() * Math.floor(word.length / 2));
      const shortWord = word.slice(0, randomShow + 1)
      question = shortWord;
      io.to(arg).emit('set-question', question);
    });

    socket.on('change-falseCount', arg => {
      io.to(arg.roomId).emit('set-falseCount', arg.falseCount);
    });

    socket.on('false-ans', async (arg) => {
      const findUser = await Player.findByPk(arg.playerId);
      await findUser.decrement({
        lives: 1
      });

      const data = await Room.findByPk(arg.roomId, {
        include: {
          model: Player,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          order: [
            ['id', 'ASC']
          ]
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      io.to(arg.roomId).emit('set-room', data);
    });

    socket.on("player-lose", (arg) => {
      socket.to(arg.roomId).emit("lose-notif", arg.playing)
      question = ""
    })

    socket.on("join-room", (roomId) => {
      socket.join(roomId)
      console.log(`User joined room ${roomId}`)
      socket.broadcast.emit("new-player-joined")
    })

    socket.on("start-the-game", (roomId) => {
      io.to(roomId).emit("start-the-game")
      console.log(`Game started in the room ${roomId}`)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  });



}

module.exports = setupRoom