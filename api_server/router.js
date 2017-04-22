const Authentication = require('./controllers/authentication');
const Activities = require('./controllers/activities');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ success: true, message: 'success' });
  });
  // Authnetication routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // Acticity routes
  app.post('/post', Activities.postNewActivity);
  app.post('/addLike', Activities.addLike);
  app.post('/addComment', Activities.addComment);
};
