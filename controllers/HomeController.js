class HomeController {
  static async home(req, res, next) {
    try {
      res.send("Welcome")
    } catch (error) {
      res.send(error)
    }
  }
}
module.exports = HomeController