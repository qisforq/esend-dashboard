// Production keys
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  herokuPostgresURI: process.env.DATABASE_URL,
  cookieKey: process.env.COOKIE_KEY
}
// If herokuPostgresURI isn't working, check to make sure it is still the same on heroku: https://data.heroku.com/datastores/da09fbdc-41dc-46db-954b-d3753614c58e#administration or by running "heroku config" on the cli inside the project folder (Make sure you look at the PRODUCTION database, which is DATABASE_URL)