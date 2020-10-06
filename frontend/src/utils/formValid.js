import _ from 'lodash'

export function username(value) {
  if (_.isString(value)) {
    return value.length >= 4
  }

  return false
}

export function name(value) {
  if (_.isString(value)) {
    return value.length > 0
  }

  return false
}

export function password(value) {
  if (_.isString(value)) {
    return value.length >= 5
  }

  return false
}

export function amount(value) {
  if (_.isInteger(parseInt(value))) {
    return parseInt(value) > 0
  }

  return false
}

export function reason(value) {
  if (_.isString(value)) {
    return value.length > 0
  }

  return false
}

export function effectiveDate(value) {
  console.log(Date.parse(value))
  return _.isDate(Date.parse(value))
}

export function expirationDate(value) {
  return _.isDate(Date.parse(value))
}

// export function division(division, divisionList) {
//   if (_.isString(value)) {
//     return divisionList.some(divi => divi.name === division)
//   }
//   return false
// }
