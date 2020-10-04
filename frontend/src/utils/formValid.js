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

// export function division(division, divisionList) {
//   if (_.isString(value)) {
//     return divisionList.some(divi => divi.name === division)
//   }
//   return false
// }
