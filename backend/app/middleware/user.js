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
    return handleError(422, err)
  }
}

exports.getDivision = async (divisionId) => {
  try {
    const divi = await Division.findById(divisionId)
    return divi.toObject()
  } catch (error) {
    return null
  }
}
