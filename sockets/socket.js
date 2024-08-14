const Helper = require("../helpers/helpers");

function setupRoom(io) {
  const roomNamespace = io.of("/socket-rooms");

  roomNamespace.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected to /socket-rooms namespace`);

    socket.on("create room", async ({ name, username }) => {
      try {
        const response = await Helper.makeRoom(name, username)
        const room = response.data.room;
        const player = response.data.player

        socket.join(room.id)

        console.log(`${username} (${socket.id} created and joined room ${room.id})`);

        socket.emit("room created", { room: room.id, username, playerId: player.id });
        socket.to(room.id).emit("user joined", { username, playerId: player.id })

      } catch (error) {
        console.log("Error creating room:", error.message || error);
        socket.emit("error", error.message || "Failed to create room");
      }
    })

    socket.on("join room", async ({ roomId, username }) => {
      try {
        const response = await Helper.joinRoom(roomId, username)

        const player = response.player

        socket.join(roomId)
        console.log(`${username} (${socket.id}) has joined room ${roomId}`);

        socket.emit("room joined", { roomId, username, playerId: player.id });
        socket.to(roomId).emit("user joined", { username, playerId: player.id });

      } catch (error) {
        console.log("Error joining room:", error.response?.data || error.message);
        socket.emit("error", error.response?.data?.message || "Failed to join room");
      }
    });

    socket.on("send message", ({ room, message }) => {
      if (room && message) {
        console.log(`Message received in room '${room}': ${message}`);
        roomNamespace.to(room).emit("new message", { sender: socket.id, message });
      } else {
        socket.emit("error", "Room ID and message are required to send a message.");
      }
    });
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}

module.exports = setupRoom