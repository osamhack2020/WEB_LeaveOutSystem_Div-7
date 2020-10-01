import camelCase from 'lodash/camelCase'
const moduleFiles = require.context('.', false, /\.js$/)
const modules = {}

moduleFiles.keys().forEach(filename => {
  if (filename !== './index.js') {
    const name = camelCase(filename.replace(/(\.\/|\.js)/g, ''))
    modules[name] = moduleFiles(filename).default
  }
})

export default modules
