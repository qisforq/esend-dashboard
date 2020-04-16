// Production keys
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  herokuPostgresURI: process.env.DATABASE_URL,
  cookieKey: process.env.COOKIE_KEY,
  rippleClientID: process.env.RIPPLE_CLIENT_ID,
  rippleClientSecret: process.env.RIPPLE_CLIENT_SECRET,
  useWhitelist: process.env.USE_WHITELIST,
}
