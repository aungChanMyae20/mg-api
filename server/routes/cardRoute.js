const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController')

router.get('/all', cardController.getAllData)
router.post('/create', cardController.addNewCard)

module.exports = router