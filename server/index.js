require('dotenv').config()
const express        = require('express')
const config         = require('./config')
const mongoose       = require('mongoose')
const fileUpload     = require('express-fileupload')
const cookieParser   = require('cookie-parser')
const errorHandlerMW = require('./middleware/errorHandlerMW')
const homeRouter     = require('./routes')
const path           = require('path')

const PORT = process.env.PORT || config.port

const app = express()

app.use(express.json())
app.use(cookieParser(process.env.COOKIEKEY))
app.use('static', express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
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