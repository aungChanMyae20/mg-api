const express = require('express')
const router = express.Router()
const albumController = require('../controllers/albumController')

router.get('/all', albumController.getAllData)
router.post('/create', albumController.addNewAlbum)

module.exports = router