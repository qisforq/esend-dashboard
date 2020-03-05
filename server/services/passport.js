const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('../config/keys');
const db = require('../../database/dbHelpers');

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
      console.error('ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ bad session cookie! Invaliditing login session.');
      done(null, false)
    }
  })
  .catch(err => console.error('ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ', err))
})

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  const { id, name } = profile
  const firstName = name.givenName
  const lastName = name.familyName
  db.insertUser(firstName, lastName, id)
  .then(user => {
    console.log('( ͡° ͜ʖ ͡°)', user);
    done(null, user)
  })
  .catch(err => done(err))

}))