const keys = require('../server/config/keys');
const { Client } = require('pg');

const databaseURI = process.env.DATABASE_URL || keys.herokuPostgresURI

async function insertTransaction(userId, recipientFirstName, recipientLastName, clabe, senderFirstName, senderLastName, esendFxRate, totalUSD, quoteData) {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });

  const { payment_id, contract_hash, payment_state, modified_at, contract } = quoteData;
  // const { created_at, quote } = contract;
  const { quote_id, created_at, type, amount, currency_code, quote_elements  } = contract.quote;

  const searchSendersText = "SELECT * FROM senders WHERE first_name = $1 AND last_name = $2 AND fk_user_id = $3;";
  const insertSenderText = "INSERT INTO senders (first_name, last_name, fk_user_id) VALUES ($1, $2, $3) RETURNING id;";
  const senderInfo = [senderFirstName, senderLastName, userId];

  const insertRecipientText = "INSERT INTO recipients (first_name, last_name, clabe_number, fk_user_id) VALUES ($1, $2, $3, $4) RETURNING id;";
  const searchRecipientsText = "SELECT * FROM recipients WHERE first_name = $1 AND last_name = $2 AND clabe_number = $3 AND fk_user_id = $4;";
  const recipientInfo = [recipientFirstName, recipientLastName, clabe, userId];

  const insertTransactionText = "INSERT INTO transactions (fk_sender_id, fk_recipient_id, esend_mt_fee, esend_mt_fx_rate_usdmxn, total_usd) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
  
  const insertRipplePaymentText = "INSERT INTO ripple_payments (payment_id, contract_hash, payment_state, modified_at, fk_transaction_id) VALUES ($1, $2, $3, $4, $5) RETURNING payment_id;";
  
  const insertRippleQuoteText = "INSERT INTO ripple_quotes (quote_id, created_at, type, amount, currency_code, fk_payment_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING quote_id;";
  
  const insertRippleQuoteElementText = "INSERT INTO ripple_quote_elements (quote_element_id, fk_quote_id, quote_element_type, quote_element_order, sender_address, receiver_address, sending_amount, receiving_amount, sending_fee, receiving_fee, sending_currency_code, receiving_currency_code, transfer_currency_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING quote_element_id;";

  const insertRippleQuoteElementFxRateText = "INSERT INTO ripple_quote_element_fx_rate (rate, base_currency_code, counter_currency_code, type, fk_quote_element_id) VALUES ($1, $2, $3, $4, $5);";

  try {
    await client.connect()
    console.log("Connected to database (insertTransaction)");
    
    const senderId = await addPerson(client, searchSendersText, insertSenderText, senderInfo, 'sender');
    console.log("senderId:",senderId);

    const recipientId = await addPerson(client, searchRecipientsText, insertRecipientText, recipientInfo, 'recipient');
    console.log("recipientId:", recipientId);
    
    const transactionInfo = [senderId, recipientId, 0, esendFxRate, totalUSD];
    const transactionId = (await client.query(insertTransactionText, transactionInfo)).rows[0].id;
    console.log("transactionId:", transactionId)
    
    const ripplePaymentInfo = [payment_id, contract_hash, payment_state, modified_at, transactionId];
    const ripplePaymentId = (await client.query(insertRipplePaymentText, ripplePaymentInfo)).rows[0].payment_id;
    console.log('Does the paymentId sent back from postgres match Ripple\'s payment ID?', (ripplePaymentId === payment_id)?('yes!'):('no :('));
    console.log();
    
    const rippleQuoteInfo = [quote_id, created_at, type, amount, currency_code, ripplePaymentId];
    const rippleQuoteId = (await client.query(insertRippleQuoteText, rippleQuoteInfo)).rows[0].quote_id;
    console.log('Does the Quote ID sent back from postgres match Ripple\'s Quote ID?', (rippleQuoteId === quote_id)?'yes!':'no :(');
    
    for (const element of quote_elements) {
      const { quote_element_id, quote_element_type, quote_element_order, sender_address, receiver_address, sending_amount, receiving_amount, sending_fee, receiving_fee, sending_currency_code, receiving_currency_code, fx_rate, transfer_currency_code } = element;
      
      const rippleQuoteElementInfo = [quote_element_id, rippleQuoteId, quote_element_type, quote_element_order, sender_address, receiver_address, sending_amount, receiving_amount, sending_fee, receiving_fee, sending_currency_code, receiving_currency_code, transfer_currency_code];
      const rippleQuoteElementId = (await client.query(insertRippleQuoteElementText, rippleQuoteElementInfo)).rows[0].quote_element_id;
      console.log(`rippleQuoteElementId #${quote_element_order}:`, rippleQuoteElementId);
      
      if (fx_rate) {
        const { rate, base_currency_code, counter_currency_code } = fx_rate;
        const fxRateType = fx_rate.type;

        const rippleQuoteElementFxRateInfo = [rate, base_currency_code, counter_currency_code, fxRateType, rippleQuoteElementId]
        await client.query(insertRippleQuoteElementFxRateText, rippleQuoteElementFxRateInfo)
      }
    }
    
    console.log("All data successfully added to database!! HOT DIGGITY DOG!!! *･゜ﾟ･*:.｡..｡.:*･'(*ﾟ▽ﾟ*)'･*:.｡. .｡.:*･゜ﾟ･*")
  }
  catch (e) {
    console.error('ʕ⁎̯͡⁎ʔ༄ insertTransaction:', e)
  }
  finally {
    await client.end()
    console.log("Disconnected from database (insertTransaction)");
  }
}

async function addPerson(client, searchText, insertText, personInfo, type = 'person') {
  // This function can be used to add a SENDER or a RECIPIENT
  const existingPersonResult = await client.query(searchText, personInfo)
  
  if (existingPersonResult.rows.length) {
    console.log(`This is the existing ${type} result:`, existingPersonResult.rows[0])
    console.log(`${type} ${personInfo[0]} ${personInfo[1]} is already in the database for this user`);
    return existingPersonResult.rows[0].id;
  } 
  else return (await client.query(insertText, personInfo)).rows[0].id;
}


async function updatePaymentState(paymentId, paymentState) {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });

  const updatePaymentStateText = "UPDATE ripple_payments SET payment_state=$1 WHERE payment_id=$2;";

  try {
    await client.connect()
    // console.log("Connected to database (updatePaymentState)");
    
    await client.query(updatePaymentStateText, [paymentState, paymentId]);

    console.log(`Payment ${paymentId} updated to ${paymentState} in database!`)
  }
  catch (e) {
    console.error('ʕ⁎̯͡⁎ʔ༄ updatePaymentState:', e)
  }
  finally {
    await client.end()
    // console.log("Disconnected from database (updatePaymentState)");
  }
}

async function searchPendingTransactions() {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });

  const searchText = "SELECT * FROM ripple_payments WHERE payment_state = 'PREPARED' OR payment_state = 'ACCEPTED' OR payment_state = 'EXECUTED';";

  try {
    await client.connect()
    // console.log("Connected to database (searchPendingTransactions)");
    
    const result = (await client.query(searchText)).rows;

    return result;
  }
  catch (e) {
    console.error('ʕ⁎̯͡⁎ʔ༄ searchPendingTransactions:', e)
  }
  finally {
    await client.end()
    // console.log("Disconnected from database (searchPendingTransactions)");
  }
}

async function searchTransactionById(id, field = '*') {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });

  const searchText = `SELECT ${field} FROM transactions WHERE id = $1;`;

  try {
    await client.connect()
    // console.log("Connected to database (searchTransactionById)");
    
    const result = (await client.query(searchText, [id])).rows[0];

    return result;
  }
  catch (e) {
    console.error('ʕ⁎̯͡⁎ʔ༄ searchTransactionById:', e)
  }
  finally {
    await client.end()
    // console.log("Disconnected from database (searchTransactionById)");
  }
}

async function searchSendersById(id, field) {
  const client = new Client({
    connectionString: databaseURI,
    ssl: true,
  });

  const searchText = `SELECT ${field} FROM senders WHERE id = $1;`;

  try {
    await client.connect()
    // console.log("Connected to database (searchSendersById)");
    
    const result = (await client.query(searchText, [id])).rows[0];

    return result;
  }
  catch (e) {
    console.error('ʕ⁎̯͡⁎ʔ༄ searchSendersById:', e)
  }
  finally {
    await client.end()
    // console.log("Disconnected from database (searchSendersById)");
  }
}

module.exports = {
  insertTransaction,
  updatePaymentState,
  searchPendingTransactions,
  searchTransactionById,
  searchSendersById,
}