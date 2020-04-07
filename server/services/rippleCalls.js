const axios = require('axios');
const { errorGlyph } = require('../extras');
const keys = require('../config/keys');


const xcurrentAddress = 'https://gomama.test.ripplexcurrent.com'

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

const createQuoteCollections = async (amount = 100, quoteType = "SENDER_AMOUNT") => {
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
  let currency = "USD"
  if (quoteType === "RECEIVER_AMOUNT") currency = "MXN"
  
  const url = xcurrentAddress + '/v4/quote_collections'
  const body = {
    sending_address: "test.usa.gomama",
    receiving_address: "test.xrapid.gomama",
    amount,
    currency,
    quote_type: quoteType,
    payment_method: "spei"
    // NOTE: ^^^^ uncomment above line in order to send transaction to the SPEI network
  }

  try {
    const { data } = await axios.post(url, body, config)

    if (data === undefined) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: data is undefined (createQuoteCollections in rippleCalls.js)`
    } else if (data.error) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: ${data.error} (createQuoteCollections in rippleCalls.js)`
    } else {
      return data 
    }
  }
  catch (e) {
    console.error(errorGlyph, e.message, "ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ Error from Ripple:", e.response.data.error, "(createQuoteCollections in rippleCalls.js)")
  }
  
}

const acceptQuote = async (quoteId, recipientFirstName, recipientLastName, clabe) => {
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
  
  const url = xcurrentAddress + '/v4/payments/accept';
  const body = {
    quote_id: quoteId,
    user_info: {
      outbound_instructions: {
        outlet_id: "spei",
        beneficiary_info: [
          {
            field_name: "recipient_family_names",
            field_value: recipientLastName,
          },
          {
            field_name: "recipient_given_names",
            field_value: recipientFirstName,
          },
          {
            field_name: "clabe",
            field_value: clabe,
          },
        ],
      },
    },
  };

  try {
    const { data } = await axios.post(url, body, config)

    if (data === undefined) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: data is undefined (acceptQuote in rippleCalls.js)`
    } else if (data.error) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: ${data.error} (acceptQuote in rippleCalls.js)`
    } else {
      console.log(`QUOTE ${quoteId} ACCEPTED!! ☆*:.｡. o(≧▽≦)o .｡.:*☆`);
      return data 
    }
  }
  catch (e) {
    console.log(errorGlyph, e.message, "ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ Error from Ripple:", e.response.data, "(acceptQuote in rippleCalls.js)")
    // return e.response.data
  }
  
}

module.exports = {
  getRippleAuthToken,
  createQuoteCollections,
  acceptQuote,
}