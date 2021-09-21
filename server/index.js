require('dotenv').config()
const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')
const errorHandlerMW = require('./middleware/errorHandlerMW')
const homeRouter = require('./routes')

const PORT = process.env.PORT || config.port

const app = express()

app.use('/', homeRouter)

// Error handling
app.use(errorHandlerMW)

const start = () => {
  try {
    mongoose.connect(config.database, (err) => {
      console.log(err ? err : 'Database connected successfully')
    })
    app.listen(PORT, () => {
      console.log('Server started at port', PORT)
    })
  } catch (error) {
    console.error(error)
  }
}

start()