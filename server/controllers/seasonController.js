const SeasonModel = require('../models/seasonModel')

const seasonController = {

  getAllSeasons: async (req, res) => {
    try {
      const data = await SeasonModel.find().sort({ endDate: -1 })
      res.json(data);
    } catch (error) {
      console.error('Error fetching albums:', error)
      res.status(500).json({ message: 'Server error' })
    }
  },
  saveEvent: async (req, res) => {
    try {
      const { _id, ...rest } = req.body
      if (!_id) {
        const { name } = req.body
        const eventTag = name?.toLowerCase().replaceAll(' ', '_')
        const dataToAdd = new SeasonModel({ ...req.body, eventTag })
        const savedData = await dataToAdd.save()
        return res.json({
          success: true,
          message: 'Season created',
          data: savedData
        })  
      }
      const savedSeason = await SeasonModel.findByIdAndUpdate(_id, rest)
      return res.json({
        success: true,
        message: 'Season Updated',
        data: savedSeason
      })
    } catch (error) {
      console.error('Error adding new season:', error)
      res.status(500).json({ message: 'Server error'})
    }
  }
}

module.exports = seasonController