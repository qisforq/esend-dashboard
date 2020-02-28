const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('../config/keys');

const googleClientID = process.env.googleClientID || require('../config/keys').googleClientID;
const googleClientSecret = process.env.googleClientSecret || require('../config/keys').googleClientSecret;

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(new GoogleStrategy({
  // clientID: '131423221384-tk31vh752u88ol2h5tdc7g7grqnbop3r.apps.googleusercontent.com',
  // clientSecret: 'Ux1KGgfS95ziSji1ZgrqtdZw',
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

  // User.findOne({ googleId: profile.id })
  //   .then((existingUser) => {
  //     if (existingUser) {
  //       done(null, existingUser);
  //     } else {
  //       new User({ 
  //         googleId: profile.id
  //       }).save().then(user => done(null, user));
  //     }
  //   })
}))