const ApiError = require('../errors/ApiError')
class UserController {

  async register(req, res) {
    res.send({msg: 'reg'})
  }

  async login(req, res) {
    res.send({msg: 'login'})
  }

  async check(req, res, next) {
    let query = req.query
    if (!query.id) {
      return next(ApiError.badRequest('Id is not provided'))
    }
    res.json({query})
  }

}

module.exports = new UserController