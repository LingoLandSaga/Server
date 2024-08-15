if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const router = require("./routes");
const setupRoom = require("./sockets/socket");

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

io.engine.use((req, res, next) => {
  next()
})

app.use(router)

setupRoom(io);

httpServer.listen(PORT, () => {
  console.log(`LingoLandSaga is listening on ${PORT}`)
})
