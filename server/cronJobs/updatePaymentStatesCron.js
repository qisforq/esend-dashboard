const db = require('../../database/rippleDbCalls');
const { getPaymentById } = require('../services/rippleCalls');
const { findUserById } = require('../../database/authDbCalls');
const { sendConfirmationEmail } = require('../services/sendEmails');

setInterval(async () => {
  try {
    console.log('Checking for payments that need updating...');
    const transactions = await db.searchPendingTransactions()
    
    if (transactions.length)
    for (const tx of transactions) {
      const { payment_id, payment_state, fk_transaction_id } = tx;
      const newPaymentState = (await getPaymentById(payment_id)).payment_state;
      
      if (newPaymentState !== payment_state) await db.updatePaymentState(payment_id, newPaymentState)

      if (newPaymentState === 'COMPLETED') {
        // TODO: This is where you can EMAIL the user to let them know their transaction was completed
        const senderInfo = await db.searchTransactionById(fk_transaction_id);
        const senderId = senderInfo.fk_sender_id;
        const sendAmount = senderInfo.total_usd
        
        const userId = (await db.searchSendersById(senderId, 'fk_user_id')).fk_user_id;

        const user = await findUserById(userId)
        sendConfirmationEmail(user.first_name, sendAmount, fk_transaction_id, user.google_profile_id)
      }
    }
    console.log('Done updating payments');
    
  } catch(e) {
    console.error(e)
  }
}, 5 * 60 * 1000)
// 30 * 60 * 1000 = 30 minutes in milliseconds
