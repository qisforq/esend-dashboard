const passport = require('passport');
const path = require('path');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard');
  });

  app.get('/api/logout', (req, res) => {
    console.log(`${req.user.first_name} has logged out. Farewell ${req.user.first_name}!`);
    req.logout();
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    // console.log(req);
    
    res.send(req.user)});
  
  // app.get('/*', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '/../../client/dist') }));
};
