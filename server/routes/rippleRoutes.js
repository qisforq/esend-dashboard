const { createQuoteCollections, acceptQuote } = require('../services/rippleCalls');
const { calculateEsendUsdMxnRate } = require('../calculators');

module.exports = (app) => {
  
  app.get('/fx_rate/usdmxn', (req, res) => {
    res.send({usdMxnRate: require('../cronJobs/fxRateCron')})
  })

  app.post('/ripple/create-quote', async (req, res) => {
    let { receiveAmount } = req.body
    let quoteData = await createQuoteCollections(receiveAmount, "RECEIVER_AMOUNT");
    // if (quoteData.quotes.length === 0) res.send({ERROR: quoteData.quote_errors})
    
    let fxRate = calculateEsendUsdMxnRate(quoteData)
    let quoteId = quoteData.quotes[0].quote_id
    let rippleSendingAmountUSD = quoteData.quotes[0].quote_elements[0].sending_amount
    console.log(`Ripple quote just created! Quote ID: ${quoteId}`);
    console.log(`( ͡° ͜ʖ ͡°) Looks like somebody wants to send $${rippleSendingAmountUSD} to Mexico`);
    console.log();
    
    res.send({ quoteId, rippleSendingAmountUSD, rippleFxRate: fxRate })
    // TODO: Post quoteData to the database at this point.
  })

  app.post('/ripple/accept-quote', async (req, res) => {
    let { quoteId, recipientFirstName, recipientLastName, clabe } = req.body
    let quoteData = await acceptQuote(quoteId, recipientFirstName, recipientLastName, clabe);
    
    if (quoteData) res.send(quoteData)
    else res.status(500).send("Error accepting Ripple quote")
    
    // TODO: Post quoteData to the database at this point, and then only send the necessary data to the client 
  })
};


// setTimeout(() => console.log("test 1->>>",require('../services/rippleAuthCron')), 7000)
// setTimeout(() => console.log("test 2->>>",require('../services/rippleAuthCron')), 12000)
// setTimeout(() => console.log("test 3->>>",require('../services/rippleAuthCron')), 17000)
// setTimeout(() => console.log("test 4->>>",require('../services/rippleAuthCron')), 22000)