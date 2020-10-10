const ObjectId = require('mongodb').ObjectID

const json = [
  {
    _id: new ObjectId('5aa1c2c35ef7a4e97b5e9a5a'),
    name: '육군'
  },
  {
    _id: new ObjectId('5aa1c2c35ef7a4e97b5e9a5b'),
    name: '7사단 정보통신대대'
  },
  {
    _id: new ObjectId('5aa1c2c35ef7a4e97b5e9a5c'),
    name: '17사단 정보통신대대',
    users: [
      {
        userId: '5aa1c2c35ef7a4e97b5e995b',
        username: '20-11111234'
      }
    ]
  }
]

module.exports = json
