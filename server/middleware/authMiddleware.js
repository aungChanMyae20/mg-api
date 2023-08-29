const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: 'No access token provided'
    })
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid access token'})
  }
}