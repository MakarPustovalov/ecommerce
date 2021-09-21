const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

const brandModel = model('Brand', brandSchema)

module.exports = brandModel