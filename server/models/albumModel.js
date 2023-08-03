const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  albumTag: {
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
  },
  rewards: {
    type: String,
    required: false
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ]
})

module.exports = mongoose.model('Album', albumSchema)