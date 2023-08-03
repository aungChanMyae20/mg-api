const mongoose = require('mongoose')

// const userCardSchema = new mongoose.Schema({
//   _id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Card'
//   },
//   count: {
//     type: Number,
//     required: true
//   }
// })

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: false
  },
  pin: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  cards: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    },
    count: {
      type: Number,
      required: true
    }
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  membership: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('User', userSchema)