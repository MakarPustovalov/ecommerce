import mongoose from 'mongoose';
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
});

const itemModel = model('Item', itemSchema)

module.exports = itemModel