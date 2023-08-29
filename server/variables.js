const roles = ['admin', 'moderator', 'user']

const serverError = {
  success: false,
  message: "Internal server error"
}

module.exports = { 
  roles,
  serverError
}