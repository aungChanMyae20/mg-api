const LogModel = require("../models/logModel")

const logController = {
  getAllLogs: async (req, res) => {
    try {
      const logs = await LogModel.find()
      res.json({
        success: true,
        message: `${logs.length} log${logs.length > 1 ? 's' : ''} found`,
        data: logs
      })
    } catch (error) {
      console.error('Error getting logs', error)
      res.status(500).json({
        success: false,
        message: 'Error getting logs'
      })
    }
  },
  getLog: async (req, res) => {
    try {
      const { logId } = req.params
      const log = await LogModel.findById(logId)
      if (!log) {
        return res.status(404).json({
          success: false,
          message: 'Log not found'
        })
      }
      return res.json({
        success: true,
        message: 'Log found',
        data: log
      })
    } catch (error) {
      console.error('Error getting log:', error)
      res.status(500).json({
        success: false,
        message: 'Error getting log'
      })
    }
  }
}

module.exports = logController