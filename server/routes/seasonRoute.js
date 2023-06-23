const express = require('express')
const router = express.Router();
const seasonController = require('../controllers/seasonController')

router.get('/all', seasonController.getAllData)
router.post('/create', seasonController.addNewSeason)

module.exports = router