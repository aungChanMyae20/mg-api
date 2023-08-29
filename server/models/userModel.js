const dayjs = require('dayjs')
const mongoose = require('mongoose')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

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
  role: [{
    type: String
  }],
  cards: [{
    cardId: {
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
  }],
  createdBy: {
    type: String,
    required: false
  },
  joinedDate: {
    type: Date,
  },
  notifications: [
    {
      logId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log'
      },
      viewed: {
        type: Boolean,
        required: true
      }
    }
  ],
  requests: {
    friends: [
      {
        type: String,
      }
    ],
    groups: [
      {
        type: String,
      }
    ]
  }
}, { versionKey: false })

const UserModel = mongoose.model('User', userSchema)

userSchema.pre('save', function (next) {
  if (this.joinedDate) {
    this.joinedDate = dayjs(this.joinedDate).utc().toDate()
  }
  next()
})

module.exports = UserModel