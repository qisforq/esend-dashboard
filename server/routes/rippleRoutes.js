const { createQuoteCollections, acceptQuote } = require('../services/rippleCalls');
const { calculateEsendUsdMxnRate } = require('../calculators');
const db = require('../../database/dbCalls');

module.exports = (app) => {
  
  app.get('/fx_rate/usdmxn', (req, res) => {
    res.send({usdMxnRate: require('../cronJobs/fxRateCron')})
  })

  app.post('/ripple/create-quote', async (req, res) => {
    const { receiveAmount } = req.body;
    const quoteData = await createQuoteCollections(receiveAmount, "RECEIVER_AMOUNT");
    // if (quoteData.quotes.length === 0) res.send({ERROR: quoteData.quote_errors})
    
    if (!quoteData.hasOwnProperty('quotes') || (quoteData.hasOwnProperty('quotes') && !quoteData.quotes.length)) {
      console.log("Ripple's response:",quoteData);
      res.status(500).send("Error creating Ripple quote");
    }
    
    const fxRate = calculateEsendUsdMxnRate(quoteData)
    const quoteId = quoteData.quotes[0].quote_id;
    const rippleSendingAmountUSD = quoteData.quotes[0].quote_elements[0].sending_amount;
    const rippleReceivingAmountBeforeFeeMXN = parseFloat(quoteData.quotes[0].quote_elements[3].receiving_amount);
    const receivingFee = parseFloat(quoteData.quotes[0].quote_elements[3].receiving_fee);
    const rippleReceivingAmountMXN = (rippleReceivingAmountBeforeFeeMXN - receivingFee)
    // .toFixed(2);

    console.log(`Ripple quote just created! Quote ID: ${quoteId}`);
    console.log(`( ͡° ͜ʖ ͡°) Looks like somebody wants to send $${rippleSendingAmountUSD} to Mexico`);
    console.log(`Ripple Receiving Amount: ${rippleReceivingAmountBeforeFeeMXN} MXN`)
    console.log(`Ripple Receiving Fee: ${receivingFee} MXN`);
    console.log(`Receiving Amount after fee: $${rippleReceivingAmountMXN} MXN`);
    console.log();
    
    res.send({ quoteId, rippleSendingAmountUSD, rippleReceivingAmountMXN, rippleFxRate: fxRate })
    // TODO: Post quoteData to the database at this point? Maybe not since there is no recipient info yet, which might cause database problems.
  })

  app.post('/ripple/accept-quote', async (req, res) => {
    const { quoteId, recipientFirstName, recipientLastName, clabe } = req.body
    const quoteData = await acceptQuote(quoteId, recipientFirstName, recipientLastName, clabe);
    console.log(req.user.id);
    
    if (quoteData) {
      // db.insertTransaction()
      res.send(quoteData)
    } 
    else res.status(500).send("Error accepting Ripple quote")
    
    // TODO: Post quoteData to the database at this point, and then only send the necessary data to the client 
  })
};


// setTimeout(() => console.log("test 1->>>",require('../services/rippleAuthCron')), 7000)
// setTimeout(() => console.log("test 2->>>",require('../services/rippleAuthCron')), 12000)
// setTimeout(() => console.log("test 3->>>",require('../services/rippleAuthCron')), 17000)
// setTimeout(() => console.log("test 4->>>",require('../services/rippleAuthCron')), 22000)