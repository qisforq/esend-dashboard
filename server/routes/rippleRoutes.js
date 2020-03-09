/*
TODO: you should implement payment routes here.

NOTE: I need to make sure I use a good strategy to store 
the Ripple access_token, which expires every half hour.

I think the access_token should be stored in the database.

There should be a CRON job that refreshes the token every hour, and persists it to database.
You can use either node-schedule or node-cron
NOTE: You can also use this to update the exchange rate that'll be published on the main page
*/
module.exports = (app) => {

  app.get('/ripple_payment?', (req, res) => {

  })

};
