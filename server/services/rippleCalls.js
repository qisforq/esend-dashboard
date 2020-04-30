const axios = require('axios');
const { errorGlyph } = require('../extras');
const keys = require('../config/keys');
const https = require('https');
const readSSLCert = require('./readSSLCert');

// const xcurrentAddress = 'https://gomama.test.ripplexcurrent.com'

async function getRippleAuthToken() {
  let url = 'https://ripplenet-production-eu.eu.auth0.com/oauth/token'
  let body = {
    grant_type: "client_credentials",
    audience: keys.rippleAudience,
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
  const caCrt = await readSSLCert();
  // const DISABLESSL = new https.Agent({ rejectUnauthorized: false });
  const SSL = new https.Agent({  
    ca: caCrt,
    keepAlive: false
  });
  const config = {
    headers: { Authorization: `Bearer ${require('../cronJobs/rippleAuthCron')}` },
    httpsAgent: SSL,
  };
  let currency = "USD"
  if (quoteType === "RECEIVER_AMOUNT") currency = "MXN"
  
  const url = keys.rippleXCurrentAddress + '/v4/quote_collections'
  const body = {
    sending_address: keys.rippleSendingAddress,
    receiving_address: keys.rippleReceivingAddress,
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
    let msg;
    e.hasOwnProperty('response') ? msg = e.response : msg = e
    console.error(errorGlyph, e.message, "ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ Error from Ripple:", msg, "(createQuoteCollections in rippleCalls.js)")
  }
  
}

const acceptQuote = async (quoteId, recipientFirstName, recipientLastName, clabe) => {
  const caCrt = await readSSLCert();
  // const DISABLESSL = new https.Agent({ rejectUnauthorized: false });
  const SSL = new https.Agent({  
    ca: caCrt,
    keepAlive: false
  });

  const config = {
    headers: { Authorization: `Bearer ${require('../cronJobs/rippleAuthCron')}` },
    httpsAgent: SSL,
  };
  
  const url = keys.rippleXCurrentAddress + '/v4/payments/accept';
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

const getPayments = async (states = 'LOCKED',page = 0) => {
  const caCrt = await readSSLCert();
  // const DISABLESSL = new https.Agent({ rejectUnauthorized: false });
  const SSL = new https.Agent({  
    ca: caCrt,
    keepAlive: false
  });

  const url = `${keys.rippleXCurrentAddress}/v4/payments?connector_role=SENDING&states=${states}&page=${page}`

  const config = {
    headers: { Authorization: `Bearer ${require('../cronJobs/rippleAuthCron')}` },
    httpsAgent: SSL,
  };

  try {
    const { data } = await axios.get(url, config)

    if (data === undefined) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: data is undefined (getPayments in rippleCalls.js)`
    } else if (data.error) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: ${data.error} (getPayments in rippleCalls.js)`
    } else {
      return data 
    }
  }
  catch (e) {
    // console.error(errorGlyph, e.message, "ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ Error from Ripple:", e.response.data.error, "(getPayments in rippleCalls.js)")
    console.log(e);
    
  }
  
}

const settlePayment = async (paymentId) => {
  const caCrt = await readSSLCert();
  // const DISABLESSL = new https.Agent({ rejectUnauthorized: false });
  const SSL = new https.Agent({  
    ca: caCrt,
    keepAlive: false
  });
  const url = `${keys.rippleXCurrentAddress}/v4/payments/${paymentId}/settle`

  const config = {
    headers: { Authorization: `Bearer ${require('../cronJobs/rippleAuthCron')}` },
    httpsAgent: SSL,
  };

  try {
    const { data } = await axios.post(url, {}, config)

    if (data === undefined) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: data is undefined (settlePayment in rippleCalls.js)`
    } else if (data.error) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: ${data.error} (settlePayment in rippleCalls.js)`
    } else {
      return data 
    }
  }
  catch (e) {
    // console.error(errorGlyph, e.message, "ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ Error from Ripple:", e.response.data.error, "(settlePayment in rippleCalls.js)")
    console.log(e);
    
  }
}

const getPaymentById = async (paymentId) => {
  const caCrt = await readSSLCert();
  // const DISABLESSL = new https.Agent({ rejectUnauthorized: false });
  const SSL = new https.Agent({  
    ca: caCrt,
    keepAlive: false
  });

  const url = `${keys.rippleXCurrentAddress}/v4/payments/${paymentId}`

  const config = {
    headers: { Authorization: `Bearer ${require('../cronJobs/rippleAuthCron')}` },
    httpsAgent: SSL,
  };

  try {
    const { data } = await axios.get(url, config)

    if (data === undefined) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: data is undefined (getPaymentById in rippleCalls.js)`
    } else if (data.error) {
      throw `ʕ⁎̯͡⁎ʔ༄ ERROR: ${data.error} (getPaymentById in rippleCalls.js)`
    } else {
      return data 
    }
  }
  catch (e) {
    // console.error(errorGlyph, e.message, "ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ Error from Ripple:", e.response.data.error, "(getPaymentById in rippleCalls.js)")
    console.log(e);
    
  }
}



module.exports = {
  getRippleAuthToken,
  createQuoteCollections,
  acceptQuote,
  getPayments,
  settlePayment,
  getPaymentById,
}