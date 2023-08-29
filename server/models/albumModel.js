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
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ]
}, { versionKey: false })

const AlbumModel = mongoose.model('Album', albumSchema)

module.exports = AlbumModel
