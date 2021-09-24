const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.delete('/delete', UserController.delete)
router.post('/login', UserController.login)
router.get('/check', UserController.check)

module.exports = router