const routeFiles = require.context('.', false, /\.js$/) // Get js files inside routes folder
const routes = []

routeFiles.keys().forEach(filename => {
  if (filename !== './index.js') {
    const route = routeFiles(filename).default
    routes.push(...route)
  }
})

export default routes
