const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9c55'),
//    division: '5aa1c2c35ef7a4e97b5e9a5c',
    issuer: 'admin',
    target: ['20-11111235'],
    effectiveDate: new Date("2020-05-27T00:00:00Z"),
    expirationDate: new Date("2020-10-27T00:00:00Z"),
    type: '휴가',
    kind: '포상',
    amount: 5,
    reason: '인성교육 우수',
    message: '',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  }
]
