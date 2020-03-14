const { createQuoteCollections } = require('../services/rippleCalls');


module.exports = (app) => {

  app.get('/fx_rate/usdmxn', async (req, res) => {

    
    res.send({usdmxnRate: require('../cronJobs/fxRateCron')})
  })

};


// setTimeout(() => console.log("test 1->>>",require('../services/rippleAuthCron')), 7000)
// setTimeout(() => console.log("test 2->>>",require('../services/rippleAuthCron')), 12000)
// setTimeout(() => console.log("test 3->>>",require('../services/rippleAuthCron')), 17000)
// setTimeout(() => console.log("test 4->>>",require('../services/rippleAuthCron')), 22000)