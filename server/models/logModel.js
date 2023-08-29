const mongoose = require('mongoose')
const dayjs = require('dayjs')

const logSchema = new mongoose.Schema({
  subject: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    }
  },
  action: {
    type: String,
    required: true
  },
  target: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    }
  },
  category: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  }
}, { versionKey: false })

const LogModel =  mongoose.model('Log', logSchema)

logSchema.pre('save', function (next) {
  if (this.dateTime) {
    this.dateTime = dayjs(this.dateTime).toDate()
  }
  next()
})

module.exports = LogModel