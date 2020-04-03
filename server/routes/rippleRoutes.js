const { createQuoteCollections } = require('../services/rippleCalls');
const { calculateEsendUsdMxnRate } = require('../calculators');

module.exports = (app) => {
  
  app.get('/fx_rate/usdmxn', (req, res) => {
    res.send({usdMxnRate: require('../cronJobs/fxRateCron')})
  })

  app.post('/ripple/create-quote', async (req, res) => {
    let { receiveAmount } = req.body
    let quoteData = await createQuoteCollections(receiveAmount, "RECEIVER_AMOUNT");
    // if (quoteData.quotes.length === 0) {
    //   res.send({ERROR: quoteData.quote_errors})
    // }
    // TODO: TOMORROW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let fxRate = calculateEsendUsdMxnRate(quoteData)
    res.send({ quoteData, usdMxnRate: fxRate })
    // TODO: Post quoteData to the database at this point, and then only send the necessary data to the client (i.e. sendAmount and receiveAmount and fx_rate)
  })
};


// setTimeout(() => console.log("test 1->>>",require('../services/rippleAuthCron')), 7000)
// setTimeout(() => console.log("test 2->>>",require('../services/rippleAuthCron')), 12000)
// setTimeout(() => console.log("test 3->>>",require('../services/rippleAuthCron')), 17000)
// setTimeout(() => console.log("test 4->>>",require('../services/rippleAuthCron')), 22000)