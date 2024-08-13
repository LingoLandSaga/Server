if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const router = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.use(errorHandler)

httpServer.listen(PORT, () => {
  console.log(`LingoLandSaga is listening on ${PORT}`)
})