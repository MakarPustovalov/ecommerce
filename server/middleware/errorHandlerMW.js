const ApiError = require('../errors/ApiError')

module.exports = function(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({error: true, message: err.message})
  }
  console.error(err)
  return res.status(500).json({error: true, message: 'Unexcepted error'})
}