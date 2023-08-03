var express = require('express')
var rootRouter = express.Router()
const { authenticateToken } = require('../middleware/authMiddleware')

var season = require('./seasonRoute')
var album = require('./albumRoute')
var card = require('./cardRoute')
var user = require('./userRoute')
var wishlist = require('./wishlistRoute')
var auth = require('./authRoute')
var group = require('./groupRoute')

rootRouter.use('/season', season)
rootRouter.use('/album', authenticateToken, album)
rootRouter.use('/card', card)
rootRouter.use('/user', user)
rootRouter.use('/wishlist', wishlist)
rootRouter.use('/auth', auth)
rootRouter.use('/group', group)

module.exports = rootRouter