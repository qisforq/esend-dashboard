const ESEND_MARKUP = 0.03;

function calculateEsendUsdMxnRate(quoteData) {
  if (!quoteData || !quoteData.quotes.length) {
    throw "ʕ•̫͡•ʔʕ⁎̯͡⁎ʔ༄  quoteData isn't what it's supposed to be (calculateEsendUsdMxnRate) in calculators.js"
  }
  let usdxrpRate = quoteData.quotes[0].quote_elements[1].fx_rate.rate
  let mxnxrpRate = quoteData.quotes[0].quote_elements[3].fx_rate.rate

  let usdmxnRate = mxnxrpRate / usdxrpRate
  let markedUpRate = usdmxnRate * (1 - ESEND_MARKUP)
  console.log('The RIPPLE USD/MXN exchange rate is', parseFloat(usdmxnRate).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4}))
  console.log('The ESEND USD/MXN exchange rate is', parseFloat(markedUpRate).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4}))
  console.log('Ripple data retrieved at:', new Date(quoteData.quotes[0].created_at), 'and fx rate calculated at:', new Date());
  console.log();

  return markedUpRate;
}


module.exports = {
  calculateEsendUsdMxnRate,
}