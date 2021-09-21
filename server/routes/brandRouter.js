const express = require('express')
const router = express.Router()
const BrandController = require('../controllers/BrandController')

router.get('/all', BrandController.getAll)
router.get('/', BrandController.getOne)
router.post('/', BrandController.create)
router.put('/', BrandController.update)
router.delete('/', BrandController.delete)

module.exports = router