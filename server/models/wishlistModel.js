const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }]
})

module.exports = mongoose.model('Wishlist', wishlistSchema)