
const sendConfirmationEmail = (firstName, sendAmount, txNumber, googleProfileId) => {
  console.log(`
  Dear ${firstName}, 

  Your remittance of $${parseFloat(sendAmount).toFixed(2)} (transaction #${txNumber}) has been delivered!! 

  Yours truly, 

  eSend
`)
}

module.exports = {
  sendConfirmationEmail,
}