const express = require('express')
const router = express.Router()
const albumController = require('../controllers/albumController')

router.get('/albums', albumController.getAllAlbums)
router.get('/albums/:eventTag', albumController.getBySeason)
router.get('/album/:albumTag', albumController.getByAlbumTag)
router.post('/album', albumController.createAlbum)
router.put('/album', albumController.updateAlbum)
router.delete('/album/:albumID', albumController.deleteAlbum)

module.exports = router