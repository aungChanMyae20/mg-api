const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')

router.get('/all', wishlistController.getAllData)
router.post('/create', wishlistController.addNewWishlist)

module.exports = router