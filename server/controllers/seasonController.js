const SeasonModel = require('../models/seasonModel')

const seasonController = {

  getAllSeasons: async (req, res) => {
    try {
      const data = await SeasonModel.find()
      res.json(data);
    } catch (error) {
      console.error('Error fetching albums:', error)
      res.status(500).json({ message: 'Server error' })
    }
  },
  addNewSeason: async (req, res) => {
    try {
      const { name } = req.body
      const eventTag = name?.toLowerCase().replaceAll(' ', '_')
      const dataToAdd = new SeasonModel({ ...req.body, eventTag })
      const savedData = await dataToAdd.save()
      res.json({
        success: true,
        message: 'Season created',
        data: savedData
      })
    } catch (error) {
      console.error('Error adding new season:', error)
      res.status(500).json({ message: 'Server error'})
    }
  }
}

module.exports = seasonController