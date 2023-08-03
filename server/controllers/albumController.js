const SeasonModel = require('../models/seasonModel')
const AlbumModel = require('../models/albumModel')
const CardModel = require('../models/cardModel')

const albumController = {
  getAllAlbums: async (req, res) => {
    try {
      const data = await AlbumModel.find();
      if (!data) {
        res.status(400).json({
          success: false,
          message: 'Bad Request'
        })
      }
      const transformedData = data.map((item) => ({
        _id: item._id,
        name: item.name,
        seasonID: item.seasonID,
        number: item.number,
        rewards: item.rewards
      }))
      res.json({
        success: true,
        message: `${transformedData.length} albums found`,  
        data: transformedData
      })
    } catch (error) {
      console.error('Error fetching albums:', error)
      res.status(500).json({ 
        message: 'Server error'
      })
    }
  },
  createAlbum: async (req, res) => {
    try {
      const { cards, name, ...rest } = req.body
      const albumTag = name.toLowerCase().replaceAll(' ', '_')
      const album = new AlbumModel({
        name,
        albumTag,
        ...rest
      })

      const savedAlbum = await album.save()
      const createdCards = []

      for (const cardData of cards) {
        const card = new CardModel({
          albumID: savedAlbum._id,
          ...cardData
        })
        const savedCard = await card.save()
        createdCards.push(savedCard)
      }

      savedAlbum.cards = createdCards
      await savedAlbum.save()
      
      res.json(albumTag)
    } catch (error) {
      console.error('Error adding new album:', error)
      res.status(500).json({ message: 'Server error'})
    }
  },
  updateAlbum: async (req, res) => {
    try {
      const { _id: albumID, cards, ...rest } = req.body

      const updatedAlbum = await AlbumModel.findByIdAndUpdate(
        albumID,
        { ...rest },
        { new: true }
      )
      const updatedCardIds = [];
      const newCardIds = []
      for (const cardData of cards) {
        const { _id, ...other } = cardData

        if (_id) {
          await CardModel.findByIdAndUpdate(_id, { ...other })
          updatedCardIds.push(_id)
        } else {
          const newCard = new CardModel({
            albumID,
            ...other
          })
          const savedCard = await newCard.save()
          newCardIds.push(savedCard._id)
        }
      }
      const removedCardIds = updatedAlbum.cards.filter(
        (cardId) => !updatedCardIds.includes(cardId.toString())
        )

      await CardModel.deleteMany({ _id: { $in: removedCardIds}})

      updatedAlbum.cards = [...updatedCardIds, ...newCardIds]
      await updatedAlbum.save()

      const album = await AlbumModel.findById(albumID).populate('cards')
      res.json(album)
    } catch (error) {
      console.error('Error updating album:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },
  deleteAlbum: async (req, res) => {
    try {
      const { albumID } = req.params
      const album = await AlbumModel.findById(albumID)
      if (!album) {
        res.status(401).json({ message: 'Album not found'})
      }

      const cardIds = album.cards

      await CardModel.deleteMany({ _id: { $in: cardIds }})
      await album.deleteOne()
      res.json({ message: 'Album successfully deleted'})
    } catch (error) {
      console.error('Error deleting album:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },
  getBySeason: async (req, res) => {
    try {
      const eventTag = req.params.eventTag;
      const season = await SeasonModel.findOne({ eventTag })
      if (!season) {
        return res.status(404).json({ 
          success: false,
          message: 'Season not found'
        })
      }
      const albums = await AlbumModel.find({ seasonID: season._id })
      res.json({ 
        success: true,
        message: 'success',
        data: {
          season: season.name, 
          seasonID: season._id, 
          albums
        }
      })
    } catch (error) {
      res.status(500).json({ 
        message: 'Server error'
      })
    }
  },
  getByAlbumTag: async (req, res) => {
    try {
      const albumTag = req.params.albumTag
      const album = await AlbumModel.findOne({ albumTag }).populate('cards')
      if (!album) {
        return res.status(404).json({
          message: 'Album not found' 
        })
      }

      res.json({
        success: true,
        message: 'Album found',
        data: { ...album._doc }
      })
    } catch (error) {
      res.status(500).json({ message: 'Server error'})
    }
  },
}

module.exports = albumController