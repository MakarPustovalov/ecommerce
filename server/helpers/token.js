require('dotenv').config()
const jwt = require('jsonwebtoken')

class token {

  static create(params) {
    return jwt.sign({params}, process.env.JWTKEY, {expiresIn: '1h'})
  }

  static verify(token) {
    try {
      return jwt.verify(token, process.env.JWTKEY)
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

module.exports = token