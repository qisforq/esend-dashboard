const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../../database/authDbCalls');
const glyph = require('../extras');
const keys = require('../config/keys');

const googleClientID = keys.googleClientID;
const googleClientSecret = keys.googleClientSecret;
const useWhitelist = keys.useWhitelist;

passport.serializeUser((user, done) => {
  console.log(`Serializing the user named ${user.first_name}!`);
  
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  
  db.findUserById(id)
  .then(user => {
    if (user) {
      // console.log(`Deserializing the user named ${user.first_name}!`);
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
    console.log(`data type of variable useWhitelist: ${typeof useWhitelist}`)
    if (useWhitelist === 'true') {
      console.log('WHITELIST IS ON')
      const userObj = await db.insertUser(firstName, lastName, id)
      console.log('( ͡° ͜ʖ ͡°)', userObj.user);
      if (userObj.whitelisted) done(null, userObj.user)
      else done(null, false)
    }
    else {
      console.log('WHITELIST IS OFF')

      // Uncomment below if you are no longe using a whitelist:
      const user = (await db.insertUser(firstName, lastName, id)).user
      console.log('( ͡° ͜ʖ ͡°)', user);
      done(null, user)
    }
  }
  catch(err) {
    console.log(glyph.errorGlyph);
    console.error(err)
    done(err)
  }
}))