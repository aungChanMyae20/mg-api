const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users', userController.getAllData)
router.get('/users/:userId', userController.getUserByUser)
router.post('/user', userController.addNewUser)
router.get('/profile', userController.getProfile)

// friend request/respond
router.post('/friend/:targetId', userController.sendFriendRequest)
router.post('/friend/:logId/:status', userController.respondFriendRequest)
router.delete('/friend/:targetId', userController.removeFriend)

// notification
router.post('/notifications/:logId', userController.respondNotification)

// cards
router.post('/card/update-count/:albumTag/:cardId', userController.updateCardCount)

module.exports = router