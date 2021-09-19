const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.get('/', (req, res) => res.send({msg: 'user'}))
router.get('/register', UserController.register)
router.get('/login', UserController.login)
router.get('/check', UserController.check)

module.exports = router