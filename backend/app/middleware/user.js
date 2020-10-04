const Division = require('../models/division')
const User = require('../models/user')
const { handleError } = require('./utils')

exports.removeProperties = ({
  // eslint-disable-next-line no-unused-vars
  password,
  // eslint-disable-next-line no-unused-vars
  blockExpires,
  // eslint-disable-next-line no-unused-vars
  loginAttempts,
  ...rest
}) => rest

exports.getUsersByDivision = async (divisionId) => {
  try {
    const users = await User.find().where('division').equals(divisionId)
    return users
    // return removeProperties(users.toObject())
  } catch (err) {
    handleError(422, err)
  }
}
