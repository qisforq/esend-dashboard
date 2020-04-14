const { getPayments, settlePayment } = require('../services/rippleCalls');
const db = require('../../database/rippleDbCalls');


setInterval(async () => {
  try {
    console.log('Checking for locked payments...');
    let lockedPayments = await getPayments('LOCKED');
    await settleLockedPayment(lockedPayments)
    
    const totalPages = parseInt(lockedPayments.totalPages)
    if ( totalPages > 1)
      for (let i = 1; i < totalPages; i++) {
        console.log(`Checking page #${i+1} of lockedPayments!`);
        lockedPayments = await getPayments('Locked', i)
        await settleLockedPayment(lockedPayments)
      }
  } catch(e) {
    console.error(e)
  }
}, 1 * 60 * 1000)
// 30 * 60 * 1000 = 30 minutes in milliseconds

async function settleLockedPayment(payments) {
  if (payments.hasOwnProperty('content') && payments.content.length > 0)
    for (const payment of payments.content) {
      const { payment_id } = payment;
      console.log('Settling payment #', payment_id, '...');
      
      const response = await settlePayment(payment_id)
      console.log('Payment #',payment_id, 'Settled!')
      
      const { payment_state } = response;
      await db.updatePaymentState(payment_id, payment_state);
    }
  else console.log('No locked payments right now!');
}