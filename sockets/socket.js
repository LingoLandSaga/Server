const Helper = require("../helpers/helpers");
const { Word, Player, Room } = require('../models');

function setupRoom(io) {

  let question;

  io.on("connection", (socket) => {
    console.log(socket.id, '<<< SOCKET');

    socket.on('start-game', async () => {
      if (question) {
        io.emit('set-question', question);
      } else {
        const randomWord = Math.ceil(Math.random() * 108047);
        const { id, word } = await Word.findByPk(randomWord);
        const randomShow = Math.floor(Math.random() * Math.floor(word.length / 2));
        const shortWord = word.slice(0, randomShow + 1)
        question = shortWord;
        io.emit('set-question', question);
      }
    });

    socket.on('change-turn', arg => {
      socket.broadcast.emit('set-turn', arg);
    });

    socket.on('change-question', async () => {
        const randomWord = Math.ceil(Math.random() * 108047);
        const { id, word } = await Word.findByPk(randomWord);
        const randomShow = Math.floor(Math.random() * Math.floor(word.length / 2));
        const shortWord = word.slice(0, randomShow + 1)
        question = shortWord;
        io.emit('set-question', question);
    });

    socket.on('change-falseCount', arg => {
      io.emit('set-falseCount', arg);
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
      io.emit('set-room', data);
    });
  });
}

module.exports = setupRoom