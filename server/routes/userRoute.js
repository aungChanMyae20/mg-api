const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/all', userController.getAllData)
router.post('/create', userController.addNewUser)

module.exports = router