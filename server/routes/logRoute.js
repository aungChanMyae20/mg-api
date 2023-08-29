const express = require('express')
const router = express.Router()
const logController = require('../controllers/logController')

router.get('/logs', logController.getAllLogs)
router.get('/logs/:logId', logController.getLog)

module.exports = router