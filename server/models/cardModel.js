const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  tradable: {
    type: Boolean,
    required: true
  }
}, { versionKey: false })

const CardModel = mongoose.model('Card', cardSchema)

module.exports = CardModel
