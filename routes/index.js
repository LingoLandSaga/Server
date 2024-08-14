const router = require("express").Router()
const HomeController = require("../controllers/HomeController")
const errorHandler = require("../middlewares/errorHandler")

router.get("/", HomeController.home);
router.get('/random-words', HomeController.randomWords);
router.post('/check-word', HomeController.checkWord);
router.get("/rooms", HomeController.getRooms)
router.post("/rooms", HomeController.makeRoom)
router.post("/rooms/:roomId/join", HomeController.joinRoom)
router.use(errorHandler)

module.exports = router