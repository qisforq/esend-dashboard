const passport = require('passport');
const path = require('path');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    console.log(`${req.user.first_name} has logged out. Farewell ${req.user.first_name}!`);
    req.logout();
    res.send(req.user);
  })

  app.get('/api/current_user', (req, res) => res.send(req.user));
  
  // app.get('/*', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '/../../client/dist') }));
};
