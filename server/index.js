require('dotenv').config()
const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')
const homeRouter = require('./routes')

const PORT = process.env.PORT || config.port

const app = express()
mongoose.connect(config.database, (err) => {
  console.log(err ? err : 'Database connected successfully')
})

app.use('/', homeRouter)

app.use((req, res, next, err) => {
  res.send({error: err})
})

app.listen(PORT, () => {
  console.log('Server started at port', PORT)
})