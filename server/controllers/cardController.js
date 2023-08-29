const AlbumModel = require('../models/albumModel')
const SeasonModel = require('../models/seasonModel')
const CardModel = require('../models/cardModel')
const UserModel = require('../models/userModel')
const { serverError } = require('../variables')

const cardController = {
  getAllData: async (req, res) => {
    try {
      const data = await CardModel.find()
      res.json({
        success: true,
        message: 'success',
        data
      })
    } catch (error) {
      console.error('Error fetching cards:', error)
      res.status(500).json(serverError)
    }
  },
  addNewCard: async (req, res) => {
    try {
      const dataToAdd = new CardModel(req.body)
      const savedData = await dataToAdd.save()
      res.status(200).json({
        success: true,
        message: "Card created",
        data: savedData
      })
    } catch (error) {
      console.error('Error adding new card:', error)
      res.status(500).json({ message: 'Server error' })
    }
  },
}

module.exports = cardController