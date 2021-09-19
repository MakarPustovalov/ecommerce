const express = require('express')
const router = express.Router()
const BasketController = require('../controllers/BasketController')

router.get('/', (req, res) => res.send({msg: 'basket'}))

module.exports = router