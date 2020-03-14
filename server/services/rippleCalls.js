const axios = require('axios');
const { errorGlyph } = require('../extras');
const keys = require('../config/keys');

async function getRippleAuthToken() {
  let url = 'https://ripplenet-production-eu.eu.auth0.com/oauth/token'
  let body = {
    grant_type: "client_credentials",
    audience: "urn:ripplexcurrent-test:gomama",
    client_id: keys.rippleClientID,
    client_secret: keys.rippleClientSecret
  }
  
  try {
    const { data } = await axios.post(url, body)
    console.log("Retrieved Ripple Auth Token at", new Date());
    return data.access_token

  } catch(e) {
    console.error(errorGlyph, e)
  }
}

const createQuoteCollections = async (senderAmount = 100) => {
  const DISABLESSL = new require('https').Agent({  
    rejectUnauthorized: false
  });

  // WARNING: We may not want to Disable the SSL certificate in production.
  // I disabled it because I got an 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY' error message.
  // see here for more info: https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
  const config = {
    headers: { Authorization: `Bearer ${require('../cronJobs/rippleAuthCron')}` },
    httpsAgent: DISABLESSL,
  };
  const url = 'https://gomama.test.ripplexcurrent.com/v4/quote_collections'
  const body = {
    sending_address: "test.usa.gomama",
    receiving_address: "test.xrapid.gomama",
    amount: senderAmount,
    currency: "USD",
    quote_type: "SENDER_AMOUNT"
  }

  try {
    const { data } = await axios.post(url, body, config)
    return data
  }
  catch (e) {
    console.log(errorGlyph, "in createQuoteCollections");
    console.error(e)
  }
  
}

module.exports = {
  getRippleAuthToken,
  createQuoteCollections,
}