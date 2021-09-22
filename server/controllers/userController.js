const ApiError    = require('../errors/ApiError')
const { findOne } = require('../model/userModel')
const UserModel   = require('../model/userModel')
const bcrypt      = require('bcrypt')
class UserController {

  async register(req, res, next) {
    try {

      // check payload

      let {email, password} = req.body

      if (!email) return next(ApiError.badRequest('Email is not provided'))
      if (!password) return next(ApiError.badRequest('Password is not provided'))
      if (password.length < 5) return next(ApiError.badRequest('Password must be at least 5 symbols length'))

      let duplicate = await UserModel.findOne({email})
      if (duplicate) return next(ApiError.badRequest('User with this email already excists'))

      // hash password

      let hashedPassword = await bcrypt.hashSync(password, 7);
      if (!hashedPassword) return next(ApiError.internalError('Something wrong while ecnrypting password'))

      // creating user

      let user = new UserModel({
        email, password: hashedPassword
      })
      user = await user.save()
      if (!user) return next(ApiError.internalError('Something went wrong'))

      return res.send({
        success: true
      })
      
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  async login(req, res, next) {
    try {

      let {email, password} = req.body

      if (!email) return next(ApiError.badRequest('Email is not provided'))
      if (!password) return next(ApiError.badRequest('Password is not provided'))
      
      let user = await UserModel.findOne({email: email})
      if (!user) return next(ApiError.badRequest('This user does not excist'))

      // compare passwords

      let isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) return next(ApiError.badRequest('Password is not correct'))

      return res.send({
        success: true
      })
      
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  async getProfile(req, res, next) {
    res.send({msg: 'profile'})
  }

  async check(req, res, next) {
    let query = req.query
    if (!query.id) {
      return next(ApiError.badRequest('Id is not provided'))
    }
    res.json({query})
  }

  async delete(req, res, next) {
    try {

      let {email} = req.body

      if (!email) return next(ApiError.badRequest('Email is not provided'))

      let result = await UserModel.findOneAndDelete({email})
      if (!result) return next(ApiError.internalError('User with this email does not excist'))

      return res.json({success: true, result})
      
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

}

module.exports = new UserController