const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../../database/dbHelpers');
const glyph = require('../extras');

const googleClientID = process.env.googleClientID || require('../config/keys').googleClientID;
const googleClientSecret = process.env.googleClientSecret || require('../config/keys').googleClientSecret;

passport.serializeUser((user, done) => {
  console.log(`Serializing the user named ${user.first_name}!`);
  
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  
  db.findUserById(id)
  .then(user => {
    if (user) {
      console.log(`Deserializing the user named ${user.first_name}!`);
      done(null, user)
    } else {
      console.log(glyph.errorGlyph)
      console.error('ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ bad session cookie! Invaliditing login session.');
      done(null, false)
    }
  })
  .catch(err => console.error(glyph.errorGlyph,' ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ ', err))
})

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  const { id, name } = profile
  const firstName = name.givenName
  const lastName = name.familyName

  try {
    const user = await db.insertUser(firstName, lastName, id)
    console.log('( ͡° ͜ʖ ͡°)', user);
    done(null, user)
  }
  catch(err) {
    console.log(glyph.errorGlyph);
    console.error(err)
    done(err)
  }
}))