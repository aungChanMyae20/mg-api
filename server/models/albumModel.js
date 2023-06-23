const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seasonID: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Album', albumSchema)