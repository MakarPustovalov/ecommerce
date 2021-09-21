const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/ItemController')

router.get('/', ItemController.get)
router.post('/', ItemController.create)
router.put('/', ItemController.update)
router.delete('/', ItemController.delete)

module.exports = router