class UserController {

  async register(req, res) {
    res.send({msg: 'reg'})
  }

  async login(req, res) {
    res.send({msg: 'login'})
  }

  async check(req, res) {
    res.send({msg: 'check'})
  }

}

module.exports = new UserController