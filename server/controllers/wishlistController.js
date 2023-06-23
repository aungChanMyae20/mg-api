const Wishlist = require('../models/wishlistModel')

const wishlistController = {
  getAllData: async (req, res) => {
    try {
      const data = await Wishlist.find()
      res.json(data)
    } catch (error) {
      console.error('Error fetching wishlists:', error)
    }
  },
  addNewWishlist: async (req, res) => {
    try {
      const newWishlist = new Wishlist(req.body)
      const savedData = await newWishlist.save()
      res.json(savedData)
    } catch (error) {
      console.error('Error creating wishlist:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}

module.exports = wishlistController