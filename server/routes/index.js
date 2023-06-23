var express = require('express')
var rootRouter = express.Router()

var season = require('./seasonRoute')
var album = require('./albumRoute')
var card = require('./cardRoute')
var user = require('./userRoute')
var wishlist = require('./wishlistRoute')
var auth = require('./authRoute')

rootRouter.use('/season', season)
rootRouter.use('/album', album)
rootRouter.use('/card', card)
rootRouter.use('/user', user)
rootRouter.use('/wishlist', wishlist)
rootRouter.use('/auth', auth)

module.exports = rootRouter