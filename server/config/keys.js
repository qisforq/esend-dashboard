if (process.env.NODE_ENV === 'production') {
  // production mode - return the PROD set of keys
  module.exports = require('./prod')

} else {
  // development mode - return the DEV set of keys
  module.exports = require('./dev')
}