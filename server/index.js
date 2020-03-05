const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cookieSession = require('cookie-session')
const keys = require('./config/keys')
const glyph = require('./extras')

require('./services/passport');

const app = express();

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
  console.log(glyph.esendGlyph);
  console.log(glyph.bannerMessage);
  
  
  
});
