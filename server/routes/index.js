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
var log = require('./logRoute')

rootRouter.use('/season', season)
rootRouter.use('/album', authenticateToken, album)
rootRouter.use('/card', authenticateToken, card)
rootRouter.use('/user', authenticateToken, user)
rootRouter.use('/wishlist', authenticateToken, wishlist)
rootRouter.use('/auth', auth)
rootRouter.use('/group', authenticateToken, group)
rootRouter.use('/log', log)

module.exports = rootRouter