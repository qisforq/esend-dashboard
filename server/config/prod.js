// Production keys
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  herokuPostgresURI: process.env.DATABASE_URL,
  cookieKey: process.env.COOKIE_KEY,
  rippleClientID: process.env.RIPPLE_CLIENT_ID,
  rippleClientSecret: process.env.RIPPLE_CLIENT_SECRET,
  useWhitelist: process.env.USE_WHITELIST,
  rippleAudience: process.env.RIPPLE_AUDIENCE,
  rippleXCurrentAddress: process.env.RIPPLE_XCURRENT_ADDRESS,
  rippleSendingAddress: process.env.RIPPLE_SENDING_ADDRESS,
  rippleReceivingAddress: process.env.RIPPLE_RECEIVING_ADDRESS
}
