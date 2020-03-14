const { createQuoteCollections } = require('../services/rippleCalls');


setTimeout(async () => {
  try {
    let quoteData = await createQuoteCollections();

    module.exports = calculateUsdMxnFxRate(quoteData)
  } catch(e) {
    console.error(e)
  }
}, 2000)
// ^^execute once semi-immediately to get fx rate right away (but wait a tiny bit for auth token to come in first)


setInterval(async () => {
  try {
    let quoteData = await createQuoteCollections();
    module.exports = calculateUsdMxnFxRate(quoteData)
  } catch(e) {
    console.error(e)
  }
}, 0.2 * 60 * 1000)
// 30 * 60 * 1000 = 30 minutes in milliseconds

function calculateUsdMxnFxRate(quoteData) {
  let usdxrpRate = quoteData.quotes[0].quote_elements[1].fx_rate.rate
  let mxnxrpRate = quoteData.quotes[0].quote_elements[3].fx_rate.rate

  let usdmxnRate = mxnxrpRate / usdxrpRate

  console.log('The USD/MXN exchange rate is', parseFloat(usdmxnRate).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4}))
  console.log('Ripple data retrieved at:', new Date(quoteData.quotes[0].created_at), 'and fx rate calculated at:', new Date());
  console.log();

  return usdmxnRate;
}

