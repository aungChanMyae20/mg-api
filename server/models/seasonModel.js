const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  eventTag: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Season', seasonSchema)