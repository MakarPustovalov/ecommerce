const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const basketSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Users'},
  items: [{type: Schema.Types.ObjectId, ref: 'Items'}]
});

const basketModel = model('Basket', basketSchema)

module.exports = basketModel