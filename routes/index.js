const HomeController = require("../controllers/HomeController")

const router = require("express").Router()

router.get("/", HomeController.home)

module.exports = router