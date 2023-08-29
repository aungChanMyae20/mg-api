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
}, { versionKey: false })

const WishlistModel = mongoose.model('Wishlist', wishlistSchema)

module.exports = WishlistModel
