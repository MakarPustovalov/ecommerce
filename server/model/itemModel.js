const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  brand: {type: Schema.Types.ObjectId, ref: 'Brands'}
});

const itemModel = model('Item', itemSchema)

module.exports = itemModel