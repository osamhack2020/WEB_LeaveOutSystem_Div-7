const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const user = require('./user')

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
    },

    users: [
      new Schema(
        {
          username: {
            type: String
          },
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        },
        { _id: false }
      )
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

DivisionSchema.methods.addUser = async function (user) {
  this.users.push({ userId: user.id, username: user.username })
  await this.save()
}

DivisionSchema.methods.removeUser = async function (userId) {
  this.users.pull({ userId })
  await this.save()
}

module.exports = mongoose.model('Division', DivisionSchema)
