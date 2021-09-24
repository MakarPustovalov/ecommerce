const ApiError = require('../errors/ApiError')
const token    = require('../helpers/token')

module.exports = function(req, res, next) {
  try {
    let {access} = req.signedCookies
    if (!access) return next(ApiError.unathorized('Authorization failed'))

    let payload = token.verify(access)
    if (!payload) return next(ApiError.unathorized('Authorization failed'))

    req.userInfo = payload

    return next()
    
  } catch (error) {
    return next(ApiError.unathorized('Authorization failed'))
  }
}