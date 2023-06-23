const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  albumID: {
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
})

module.exports = mongoose.model('Card', cardSchema)