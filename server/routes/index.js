const express      = require('express')
const router       = express.Router()
const userRouter   = require('./userRouter')
const basketRouter = require('./basketRouter')
const itemRouter   = require('./itemRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/item', itemRouter)

router.get('/', (req, res) => res.send({msg: 'root'}))

module.exports = router