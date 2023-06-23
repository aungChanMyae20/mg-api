const AlbumModel = require('../models/albumModel')

const albumController = {
  getAllData: async (req, res) => {
    try {
      const data = await AlbumModel.find();
      res.json(data)
    } catch (error) {
      console.error('Error fetching albums:', error)
      res.status(500).json({ error: 'Server error'})
    }
  },
  addNewAlbum: async (req, res) => {
    try {
      const dataToAdd = new AlbumModel(req.body)
      const savedData = await dataToAdd.save()
      res.status(200).json(savedData)
    } catch (error) {
      console.error('Error adding new album:', error)
      res.status(500).json({ error: 'Server error'})
    }
  }
}

module.exports = albumController