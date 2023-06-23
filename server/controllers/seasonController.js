const SeasonModel = require('../models/seasonModel')

const seasonController = {

  getAllData: async (req, res) => {
    try {
      const data = await SeasonModel.find()
      res.json(data);
    } catch (error) {
      console.error('Error fetching albums:', error)
      res.status(500).json({ error: 'Server error' })
    }
  },
  addNewSeason: async (req, res) => {
    try {
      const dataToAdd = new SeasonModel(req.body)
      const savedData = await dataToAdd.save()
      res.status(200).json(savedData)
    } catch (error) {
      console.error('Error adding new season:', error)
      res.status(500).json({ error: 'Server error'})
    }
  }
}

module.exports = seasonController