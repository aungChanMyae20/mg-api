const mongoose = require('mongoose')
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

const seasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  eventTag: {
    type: String,
    required: true
  }
}, { versionKey: false })

seasonSchema.pre('save', function (next) {
  if (this.endDate) {
    this.endDate = dayjs(this.endDate).utc().toDate()
  }
  next()
})

const SeasonModel = mongoose.model('Season', seasonSchema)

module.exports = SeasonModel