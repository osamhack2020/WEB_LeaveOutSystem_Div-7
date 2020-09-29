const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const DivisionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Division'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('Division', DivisionSchema)
