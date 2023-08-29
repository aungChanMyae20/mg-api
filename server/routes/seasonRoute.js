const express = require('express')
const router = express.Router();
const seasonController = require('../controllers/seasonController')

router.get('/all', seasonController.getAllSeasons)
router.post('/event', seasonController.saveEvent)

module.exports = router