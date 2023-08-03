const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users', userController.getAllData)
router.post('/user', userController.addNewUser)

module.exports = router