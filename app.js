if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const router = require("./routes");

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
  req.io = io;
  return next();
});

io.engine.use((req, res, next) => {
  // console.log(req, "<<<< io engine")
  next()
})

app.use(router)

// io.on("connection", (socket) => {
//   console.log(socket.id, '<<< SOCKET');

//   socket.emit('random-words', );
// });

// io.on("connection", (socket) => {
//   console.log(`${socket.id} connected`);

//   // Move the event handling logic here or call a method in HomeController
//   // HomeController.setupSocketEvents(io, socket);

//   // socket.on('disconnect', () => {
//   //   console.log(`${socket.id} disconnected`);
//   // });
// });
io.of("/rooms").on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected to /rooms namespace`);

  socket.on("join room", (roomName, userName) => {
    console.log(`Socket ${socket.id} is attempting to join room '${roomName}'`);
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room '${roomName}'`);

    // Notify the user they've joined the room
    socket.emit("room joined", roomName);

    // Notify others in the room that a new user has joined
    socket.to(roomName).emit("user joined", socket.id);
  });

  socket.on("send message", ({ room, message }) => {
    console.log(`Message received in room '${room}': ${message}`);
    io.of("/rooms").to(room).emit("new message", { sender: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
httpServer.listen(PORT, () => {
  console.log(`LingoLandSaga is listening on ${PORT}`)
})
