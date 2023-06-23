const CardModel = require('../models/cardModel')

const cardController = {
  getAllData: async (req, res) => {
    try {
      const data = await CardModel.find()
      res.json(data)
    } catch (error) {
      console.error('Error fetching cards:', error)
      res.status(500).json({ error: 'Server error'})
    }
  },
  addNewCard: async (req, res) => {
    try {
      const dataToAdd = new CardModel(req.body)
      const savedData = await dataToAdd.save()
      res.status(200).json(savedData)
    } catch (error) {
      console.error('Error adding new card:', error)
      res.status(500).json({ error: 'Server error' })
    }
  }
}

module.exports = cardController