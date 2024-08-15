
function setupRoom(io) {

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId) => {
      socket.join(roomId)
      console.log(`User joined room ${roomId}`)
    })

    socket.on("start-the-game", (roomId) => {
      io.to(roomId).emit("start-the-game")
      console.log(`Game started in the room ${roomId}`)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })



}

module.exports = setupRoom