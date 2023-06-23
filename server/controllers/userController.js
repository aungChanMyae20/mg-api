const UserModel = require('../models/userModel')
// const Card = require('../models/cardModel')

const userController = {
  getAllData: async (req, res) => {
    try {
      const data = await UserModel.find()
      res.json(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  },
  addNewUser: async (req, res) => {
    try {
      // const { cards, ...rest } = req.body

      // const populatedUserCardsData = await Promise.all(
      //   cards.map(async (object) => {
      //     const card = await Card.findById(object._id)
      //     return {
      //       _id: card._id,
      //       count: object.count
      //     }
      //   })
      // )

      // const newUser = new UserModel({
      //   ...rest,
      //   cards: populatedUserCardsData
      // })

      const { name, pin, role = 'user', ...rest } = req.body;

      const newUser = new UserModel({
        name,
        pin,
        role,
        refreshToken: "12345678",
        ...rest
      })
      // const savedData = await newUser.save()
      await newUser.save()

      res.status(201).json({ message: 'User created', token: '12345678' })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        return res.status(400).json({ error: 'Name already exists' })
      }
      console.error('Error creating user:', error)
      res.status(500).json({ error: 'Server error' })
    }
  }
}

module.exports = userController