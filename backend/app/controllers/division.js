const Division = require('../models/division')
const User = require('../models/user')
const utils = require('../middleware/utils')
const { matchedData } = require('express-validator')
const auth = require('../middleware/auth')
const db = require('../middleware/db')

/*********************
 * Private functions *
 *********************/

async function getAllDivisionsFromDB() {
  try {
    return await Division.find().sort('name')
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

async function addModerators(divisions) {
  const result = []
  for (const divi of divisions) {
    const rusers = []
    for (const { userId } of divi.users) {
      const user = await db.getItem(userId, User)
      if (user.role === 'moderator') {
        rusers.push(user)
      }
    }
    result.push({
      name: divi.name,
      parent: divi.parent,
      _id: divi._id,
      usercnt: divi.users.length,
      moderators: rusers
    })
  }
  return result
}

async function removeUserInDivisionFromDB(divisionId, userId) {
  try {
    const division = await db.getItem(divisionId, Division)
    const user = await db.getItem(userId, User)
    // division.users.pull({ userId })
    await division.removeUser(userId)
    user.division = undefined
    await user.save()
    // await division.save()
    return { user, division }
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

async function addUserInDivisionFromDB(divisionId, userId) {
  const division = await db.getItem(divisionId, Division)
  const user = await db.getItem(userId, User)

  try {
    division.users.push({ userId, username: user.username })
    user.division = divisionId
    await user.save()
    await division.save()
    return { user, division }
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }
}

/********************
 * Public functions *
 ********************/

exports.getAllDivisions = utils.asyncRoute(async (req, res) => {
  let divisions = await getAllDivisionsFromDB()
  divisions = await addModerators(divisions)
  res.status(200).json(divisions)
})

exports.createDivision = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)
  res.status(201).json(await db.createItem(data, Division))
})

exports.getDivision = utils.asyncRoute(async (req, res) => {
  const divisionId = await utils.isIDGood(req.params.division_id)
  const target = await db.getItem(divisionId, Division)
  res.status(200).json({
    name: target.name,
    users: [...target.users]
  })
})

exports.deleteDivision = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)
  const divisionId = await utils.isIDGood(data.division_id)
  res.status(200).json(await db.deleteItem(divisionId, Division))
})

exports.addUserToDivision = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)
  const divisionId = await utils.isIDGood(data.division_id)
  const userId = await utils.isIDGood(data.user_id)
  const user = await db.getItem(userId, User)

  if (user.division) {
    await removeUserInDivisionFromDB(user.division, userId)
  }

  res.status(200).json(await addUserInDivisionFromDB(divisionId, userId))
})

exports.deleteUserFromDivision = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)
  const divisionId = await utils.isIDGood(data.division_id)
  const userId = await utils.isIDGood(data.user_id)
  await db.getItem(divisionId, Division)

  res.status(200).json(await removeUserInDivisionFromDB(divisionId, userId))
})
