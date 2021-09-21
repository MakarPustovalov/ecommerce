const BrandModel = require('../model/brandModel')
const ApiError   = require('../errors/ApiError')

class BrandController {

  async create(req, res, next) {
    try {
      const {name} = req.body
      if (!name) return next(ApiError.badRequest('Name is not provided'))
      let duplicate = await BrandModel.findOne({name})
      if (duplicate) return next(ApiError.badRequest('Brand with this name already excists'))
      let brand = await new BrandModel({name})
      brand = await brand.save()
      if (!brand) return next(ApiError.internalError('Something went wrong'))
      return res.json({result: brand})
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  async getAll (req, res) {
    try {
      let result = await BrandModel.find({})
      return res.json({result: result})
    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
  async update (req, res) {

  }
  
  async delete (req, res) {
    
  }
  
}

module.exports = new BrandController