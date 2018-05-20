function merge (...args) {
  const result = {}
  if (!args || !args.length) {
    return result
  }

  args.forEach(currentArg => {
    if (currentArg) {
      Object.keys(currentArg).forEach(key => {
        if (isObject(currentArg[key]) && result[key] && isObject(result[key])) {
          result[key] = merge(result[key], currentArg[key])
        } else if (Array.isArray(currentArg[key]) && result[key] && Array.isArray(result[key])) {
          let i = 0
          while (i < currentArg[key].length || i < result[key].length) {
            result[key][i] = merge(result[key][i], currentArg[key][i])
            i += 1
          }
          let additionalDataArray = []
          if (i < currentArg[key].length) {
            additionalDataArray = currentArg[key].slice(i, currentArg[key].length)
          }
          if (i < result[key].length) {
            additionalDataArray = result[key].slice(i, currentArg[key].length)
          }
          result[key] = result[key].concat(additionalDataArray)
        } else {
          result[key] = currentArg[key]
        }
      })
    }
  })

  return result
}

function isObject (data) {
  return (data && Object.prototype.toString.call(data) === '[object Object]')
}

const object = {
  a: [{ b: 2 }, { d: 4 }],
}

const other = {
  a: [{ c: 3 }, { e: 5 }],
}

module.exports = merge(object, other)
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }