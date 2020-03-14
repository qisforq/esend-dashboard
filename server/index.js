const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cookieSession = require('cookie-session')
const enforce = require('express-sslify')
const keys = require('./config/keys')
const glyph = require('./extras')


require('./services/passport');

// Start CRON jobs:
require('./cronJobs/rippleAuthCron');
// Note: This is to start the Ripple Auth CRON JOB. Whenever using the Ripple Auth Token, for some reason the first time you call it it's just an empty object. So we have to require it onetime first before it works. Which is why we are requiring it here. 
require('./cronJobs/fxRateCron');

const app = express();

if (process.env.NODE_ENV === 'production') {
  // Make sure all traffic is routed through https on Heroku
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

require('./routes/authRoutes')(app)
require('./routes/rippleRoutes')(app)

app.get('/*', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '/../client/dist') }));
/* ^^^^^ Paths that are handled by the client-side router (CSR), i.e. React Router, don't actually have any handling logic here in the server.
Therefore, all routes that were not handled by authRoutes (or any other route logic), should just redirect to index.html. */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
  console.log(glyph.esendGlyph);
  console.log(glyph.bannerMessage);
});


// setTimeout(() => console.log("test 1->>>",require('./cronJobs/fxRateCron')), 7000)
// setTimeout(() => console.log("test 2->>>",require('./cronJobs/fxRateCron')), 12000)
// setTimeout(() => console.log("test 3->>>",require('./cronJobs/fxRateCron')), 17000)
// setTimeout(() => console.log("test 4->>>",require('./cronJobs/fxRateCron')), 22000)