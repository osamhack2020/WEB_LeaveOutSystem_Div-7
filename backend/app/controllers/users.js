const model = require('../models/user')
const Division = require('../models/division')
const uuid = require('uuid')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const emailer = require('../middleware/emailer')

/*********************
 * Private functions *
 *********************/

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = async (req) => {
  // return new Promise((resolve, reject) => {
  //   const user = new model({
  //     username: req.username,
  //     name: req.name,
  //     email: req.email,
  //     password: req.password,
  //     division: req.division,
  //     role: req.role,
  //     verification: uuid.v4()
  //   })

  //   user.save((err, item) => {
  //     if (err) {
  //       reject(utils.buildErrObject(422, err.message))
  //     }
  //     // Removes properties with rest operator
  //     const removeProperties = ({
  //       // eslint-disable-next-line no-unused-vars
  //       password,
  //       // eslint-disable-next-line no-unused-vars
  //       blockExpires,
  //       // eslint-disable-next-line no-unused-vars
  //       loginAttempts,
  //       ...rest
  //     }) => rest
  //     resolve(removeProperties(item.toObject()))
  //   })
  // })

  const user = new model({
    username: req.username,
    name: req.name,
    email: req.email,
    password: req.password,
    division: req.division,
    role: req.role,
    verification: uuid.v4()
  })

  let item
  try {
    item = await user.save()
  } catch (err) {
    throw utils.buildErrObject(422, err.message)
  }

  // if (req.division) {
  //  const division = await db.getItem(req.division, Division)
  //  await division.addUser(user)
  // }

  const removeProperties = ({
    // eslint-disable-next-line no-unused-vars
    password,
    // eslint-disable-next-line no-unused-vars
    blockExpires,
    // eslint-disable-next-line no-unused-vars
    loginAttempts,
    ...rest
  }) => rest
  return removeProperties(item.toObject())
}

const checkUserExists = async (username) => {
  try {
    const user = await model.findOne().where('username').equals(username)
    if (user) {
      return true
    }
  } catch (unused) {
    //
  }

  return false
}

const divisionExists = async (divisionId) => {
  try {
    divisionId = await utils.isIDGood(divisionId)
    return await db.getItem(divisionId, Division)
  } catch (error) {
    throw utils.buildErrObject(422, 'DIVISION_NOT_EXISTS')
  }
}

/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    // const query = await db.checkQueryString(req.query)
    // res.status(200).json(await db.getItems(req, model, query))
    res.status(200).json(await db.getItems(req, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)

    const user = await model.findByIdAndUpdate(id, req)

    if (!req.division) {
      user.division = undefined
      await user.save()
    }

    res.status(200).json(await db.updateItem(id, model, req))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = utils.asyncRoute(async (req, res) => {
  const data = matchedData(req)
  if (await checkUserExists(data.username)) {
    throw utils.buildErrObject(422, 'USERNAME_ALREADY_EXISTS')
  }
  if (data.division) {
    await divisionExists(data.division)
  }

  const item = await createItem(data)
  res.status(201).json(item)
})

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
