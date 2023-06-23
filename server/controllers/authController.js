const User = require('../models/userModel')

const authController = {
  loginUser: async (req, res) => {
    try {
      const { name, pin } = req.body

      const user = await User.findOne({ name });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      if (user.pin !== pin) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      res.json({ message: 'Login successful' })
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Server error' })
    }
  }
}

module.exports = authController;