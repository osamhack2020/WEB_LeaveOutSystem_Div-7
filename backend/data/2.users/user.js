const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995a'),
    name: '총관리자',
    username: 'admin',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    email: 'helloworld@helloworld.com',
    role: 'admin',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995b'),
    name: '김명재',
    username: '20-11111234',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'moderator',
    division: '5aa1c2c35ef7a4e97b5e9a5c',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995c'),
    name: '박승형',
    username: '20-11111235',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995d'),
    name: '고건영',
    username: '20-11111236',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995e'),
    name: '오상진',
    username: '20-11111237',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995f'),
    name: '최병현',
    username: '20-11111238',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9960'),
    name: '정형석',
    username: '20-11111239',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e9961'),
    name: '조민수',
    username: '20-11111232',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d'
  }
]
