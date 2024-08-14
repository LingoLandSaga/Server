const { Op } = require('sequelize');
const { Word } = require('../models');

class HomeController {
  static async home(req, res, next) {
    try {
      res.send("Welcome")
    } catch (error) {
      next(error)
    }
  }
  
  static async randomWords(req, res, next) {
    try {
      const randomWord = Math.ceil(Math.random() * 108047);
      const { id, word } = await Word.findByPk(randomWord);
      const randomShow = Math.floor(Math.random() * Math.floor(word.length / 2));
      const shortWord = word.slice(0, randomShow + 1)
      res.status(200).json({id, word, shortWord});
    } catch (error) {
      next(error)
    }
  }
  
  static async checkWord(req, res, next) {
    try {
      let { answer, question } = req.body;
      answer = answer.toLowerCase();
      question = question.toLowerCase();
      if (!answer.includes(question)) throw {name: 'AnswerNotValid'}

      const findWord = await Word.findOne({
        where: {
          word: {
            [Op.iLike] : answer 
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (!findWord) throw {name: 'WordNotFound'};
      res.status(200).json(findWord);
    } catch (error) {
      next(error)
    }
  }
}
module.exports = HomeController