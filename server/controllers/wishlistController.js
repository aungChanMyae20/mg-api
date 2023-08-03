const UserModel = require('../models/userModel')
const WishlistModel = require('../models/wishlistModel')

const wishlistController = {
  getAllData: async (req, res) => {
    try {
      const data = await WishlistModel.find()
      res.json({
        success: true,
        message: `${data.length} wishlist${data.length > 1 ? 's' : ''} found.`,
        data
      })
    } catch (error) {
      console.error('Error fetching wishlists:', error)
    }
  },
  addNewWishlist: async (req, res) => {
    try {
      const newWishlist = new WishlistModel(req.body)

      const savedData = await newWishlist.save()
      res.json(savedData)
    } catch (error) {
      console.error('Error creating wishlist:', error)
      res.status(500).json({ 
        success: false,
        error: 'Server Error' 
      })
    }
  },
  addToWishlist: async (req, res) => {
    try {
      const { userId } = req.params
      const { cardId } = req.body
      const userWishlist = await WishlistModel.findOne({ userID: userId })
      if (!userWishlist) {
        const newWishlist = new WishlistModel({
          userID: userId,
          cards: [ cardId ]
        })
        const savedWishlist = await newWishlist.save()
        res.json({
          success: true,
          message: 'Card added to new wishlist',
          data: savedWishlist
        })
      }

      const prevCards = userWishlist.cards
      userWishlist.cards = [ ...prevCards, cardId ]
      await userWishlist.save()
      res.json({
        success: true,
        message: 'Card added to wishlist',
        data: userWishlist
      })
    } catch (error) {
      console.error('Error adding to wishlist', error)
      res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
  },
  removeFromWishlist: async (req, res) => {
    try {
      const { wishlistId } = req.params
      const { cardId } = req.body

      const wishlist = await WishlistModel.findById(wishlistId)
      if (!wishlist) {
        res.status(404).json({
          success: false,
          message: 'Wishlist not found',
        })
      }
      wishlist.cards.pull(cardId)
      await wishlist.save()
      res.json({
        success: true,
        message: 'Card removed from wishlist'
      })
    } catch (error) {
      console.error('Error removing card from wishlist', error)
      res.status(500).json({
        success: false,
        message: "Error removing card from wishlist."
      })
    }
  },
  removeWishlist: async (req, res) => {
    try {
      const { wishlistId } = req.params
      const wishlist = await WishlistModel.findById(wishlistId)
      if (!wishlist) {
        res.json({
          success: true,
          message: 'Wishlist already removed',
        })
      }

      await wishlist.deleteOne({ _id: wishlistId })
      res.json({
        success: true,
        message: 'Wishlist removed successfully'
      })
    } catch (error) {
      console.error('Error removing wishlist', error)
      res.json({
        success: false,
        message: 'Error removing wishlist'
      })
    }
  }
}

module.exports = wishlistController