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

      const { name, pin, role = 'user', ...rest } = req.body;

      const newUser = new UserModel({
        name,
        pin,
        role,
        ...rest
      })
      const savedUser = await newUser.save()

      res.status(201).json({ 
        success: true,
        message: 'User created',
        data: savedUser
      })
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