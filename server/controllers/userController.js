const ApiError    = require('../errors/ApiError')
const { findOne } = require('../model/userModel')
const UserModel   = require('../model/userModel')
const token       = require('../helpers/token')
const bcrypt      = require('bcrypt')
const config      = require('../config')
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

      let payload = {
        email: user.email,
        role: user.role
      }

      const accessToken = token.create(payload)

      return res
      .cookie('access', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      })
      .json({success: true, result: payload})
      
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

      let payload = {
        email: user.email,
        role: user.role
      }

      const accessToken = token.create(payload)

      return res
      .cookie('access', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        signed: true,
        domain: config.domain,
        sameSite: process.env.MODE === 'production' ? 'none' : 'lax',
        secure: process.env.MODE === 'production' ? true : false
      })
      .json({success: true, result: payload})
      
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  async check(req, res, next) {
    try {
      let {access} = req.signedCookies
      if (!access) return next(ApiError.badRequest('Token is not provided'))

      let payload = token.verify(access)
      if (!payload) return next(ApiError.badRequest('Invalid token'))

      return res.json({success: true, result: payload})
      
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  // Technical endpoint - comment out if production

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