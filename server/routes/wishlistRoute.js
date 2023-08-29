const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')

router.get('/all-wishlist', wishlistController.getAllData)
router.post('/wishlist', wishlistController.addNewWishlist)
router.post('/wishlist/:cardId', wishlistController.addToWishlist)
// router.patch('/wishlist/:wishlistId', wishlistController.removeFromWishlist)
// router.delete('/wishlist/:wishlistId', wishlistController.removeWishlist)

module.exports = router