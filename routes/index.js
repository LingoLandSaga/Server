const router = require("express").Router()
const HomeController = require("../controllers/HomeController")
const errorHandler = require("../middlewares/errorHandler")

router.get("/", HomeController.home);
router.get('/random-words', HomeController.randomWords);
router.post('/check-word', HomeController.checkWord);

router.use(errorHandler)

module.exports = router