// TEST RIPPLE AUTH CALL
// NOTE: lower the setInterval amount to 5 seconds in rippleAuthToken.js
require('../services/rippleAuthToken')
setTimeout(() => console.log("test 1->>>",require('../services/rippleAuthToken')), 7000)
setTimeout(() => console.log("test 2->>>",require('../services/rippleAuthToken')), 12000)
setTimeout(() => console.log("test 3->>>",require('../services/rippleAuthToken')), 17000)
setTimeout(() => console.log("test 4->>>",require('../services/rippleAuthToken')), 22000)