const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/signup', authController.createUser)
router.post('/login', authController.adminLogin)
router.post('/refresh-token', authController.refreshToken)

router.post('/verification', authController.verifyUser)
router.post('/user-login', authController.userLogin)

module.exports = router