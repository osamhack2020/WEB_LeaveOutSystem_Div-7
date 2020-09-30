const { Schema } = require('mongoose')
const mongoose = require('mongoose')

// 소속부대

const DivisionSchema = new mongoose.Schema(
  {
    // 부대이름
    name: {
      type: String,
      required: true
    },

    // 상위부대
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
