require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

const User = require('../models/userModel')
const UserModel = require('../models/userModel')

const { serverError } = require('../variables')

const authController = {
  createUser: async (req, res) => {
    try {

      const saltRounds = 10

      const { name, pin, role = ['user'], ...rest } = req.body;

      const hashedPin = await bcrypt.hash(pin, saltRounds);

      const newUser = new User({
        name,
        pin: hashedPin,
        role,
        createdDate: dayjs(),
        ...rest
      })
      // const savedData = await newUser.save()
      await newUser.save()

      const accessToken = jwt.sign({userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })

      const refreshToken = jwt.sign(
        { userId: newUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
      )

      res.status(201).json({
        success: true,
        message: 'User created',
        data: {
          name: newUser.name,
          id: newUser._id,
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        return res.status(400).json({
          message: 'Name already exists' 
        })
      }
      console.error('Error creating user:', error)
      res.status(500).json({ message: 'Server error' })
    }
  },
  adminLogin: async (req, res) => {
    try {
      const { name, pin } = req.body

      const user = await User.findOne({ name });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const isMatch = await bcrypt.compare(pin, user.pin)

      if (!isMatch) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        })
      }

      const accessToken = jwt.sign({userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
      )

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          name: user.name,
          id: user._id,
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' })
    }
  },
  verifyUser: async (req, res) => {
    const { name } = req.body
    try {
      const user = await UserModel.findOne({ name })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }
      return res.json({
        success: true,
        message: 'User found',
      })
    } catch (error) {
      console.error('Error verifying user')
      res.status(500).json(serverError)
    }
  },
  userLogin: async (req, res) => {
    try {
      const { name, pin } = req.body

      const user = await User.findOne({ name });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const isMatch = await bcrypt.compare(pin, user.pin)

      if (!isMatch) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        })
      }

      const accessToken = jwt.sign({userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
      )

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          name: user.name,
          id: user._id,
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json(serverError)
    }
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.body.refreshToken;
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  }
}

module.exports = authController;