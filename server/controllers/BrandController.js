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
      return res.json({success: true, result: brand})

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  async get (req, res, next) {
    try {

      let {name, id} = req.query

      if (name) {
        let result = await BrandModel.findOne({name})
        if (!result) return next(ApiError.notFound('Brand with this name not found'))
        return res.json({success: true, result})
      } else if (id) {
        let result = await BrandModel.findById(id)
        if (!result) return next(ApiError.notFound('Brand with this id not found'))
        return res.json({success: true, result})
      } else {
        let result = await BrandModel.find({})
        return res.json({success: true, result})
      }

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
  async update (req, res, next) {
    try {

      const {name, newName} = req.body
      if (!name) return next(ApiError.badRequest('Name is not provided'))
      if (!newName) return next(ApiError.badRequest('New name is not provided'))

      let duplicate = await BrandModel.findOne({name: newName})
      if (duplicate) return next(ApiError.badRequest('Brand with this name already excists'))

      let brand = await BrandModel.findOneAndUpdate({name}, {name: newName}, {new: true})
      if (!brand) return next(ApiError.internalError('Bad request'))
      return res.json({success: true, result: brand})

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
  async delete (req, res, next) {
    try {

      const {name} = req.body
      if (!name) return next(ApiError.badRequest('Name is not provided'))

      let brand = await BrandModel.findOneAndDelete({name})
      if (!brand) return next(ApiError.internalError('Brand with this name does not excist'))
      return res.json({success: true, result: brand})

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
}

module.exports = new BrandController