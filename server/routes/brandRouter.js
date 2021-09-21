const express = require('express')
const router = express.Router()
const BrandController = require('../controllers/BrandController')

router.get('/', BrandController.getAll)
router.post('/', BrandController.create)
router.put('/', BrandController.update)
router.delete('/', BrandController.delete)

module.exports = router