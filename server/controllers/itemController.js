const ItemModel = require('../model/itemModel')
const ApiError  = require('../errors/ApiError')
const uuid      = require('uuid')
const path      = require('path')
class ItemController {

  async create(req, res, next) {
    try {

      const {name, cost, brandId} = req.body
      const {img} = req.files

      if (!name) return next(ApiError.badRequest('Name is not provided'))
      if (!cost) return next(ApiError.badRequest('Cost is not provided'))

      let duplicate = await ItemModel.findOne({name})
      if (duplicate) return next(ApiError.badRequest('Item with this name already excists'))

      const fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      let item = await new ItemModel({
        name,
        cost,
        img: fileName,
        brand: brandId
      })
      item = await item.save()
      if (!item) return next(ApiError.internalError('Something went wrong'))
      return res.json({success: true, result: item})

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }

  async get (req, res, next) {
    try {

      let {name, brandId, limit, page} = req.query
      page = +page || 1
      limit = +limit || 10
      let offset = limit * page - limit

      if (name) {

        let result = await ItemModel.findOne({name})
        if (!result) return next(ApiError.notFound('Item with this name not found'))
        return res.json({success: true, result})

      } else if (!name && brandId) {

        let result = await ItemModel.find({brand: brandId}).limit(limit).skip(offset)
        if (!result) return next(ApiError.internalError('Something went wrong'))
        return res.json({success: true, result: {
          result,
          totalItems,
          page,
          limit
        }})

      } else {

        let totalItems = await ItemModel.find({}).count()
        let result = await ItemModel.find({}).limit(limit).skip(offset)
        if (!result) return next(ApiError.internalError('Something went wrong'))
        return res.json({success: true, result: {
          result,
          totalItems,
          page,
          limit
        }})

      }

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
  async update (req, res, next) {
    try {

      const {name, update} = req.body
      const {newName, cost, brandId, img} = update

      if (!name) return next(ApiError.badRequest('Name is not provided'))
      if (!update) return next(ApiError.badRequest('New data is not provided'))

      let duplicate = await ItemModel.findOne({name: newName})
      if (duplicate) return next(ApiError.badRequest('Item with this name already excists'))

      let result = await ItemModel.findOneAndUpdate({name}, {name: newName, cost, brand: brandId, img}, {new: true})
      if (!result) return next(ApiError.internalError('Bad request'))
      return res.json({success: true, result})

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
  async delete (req, res, next) {
    try {

      const {name} = req.body
      if (!name) return next(ApiError.badRequest('Name is not provided'))

      let result = await ItemModel.findOneAndDelete({name})
      if (!result) return next(ApiError.internalError('Item with this name does not excist'))
      return res.json({success: true, result})

    } catch (error) {
      console.log(error)
      return next(ApiError.internalError('Something went wrong'))
    }
  }
  
}

module.exports = new ItemController