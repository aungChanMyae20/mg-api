const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groupController')

router.get('/groups', groupController.getAllGroups)
router.get('/user-groups', groupController.getAllByUser)
router.post('/group', groupController.createGroup)
router.get('/group/:groupId', groupController.getOne)
router.put('/group/:groupId', groupController.updateGroup)
router.patch('/group/:groupId', groupController.updateMembers)
router.delete('/group/:groupId', groupController.deleteGroup)

module.exports = router