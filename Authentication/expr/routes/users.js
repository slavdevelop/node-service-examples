var express = require('express');
var router = express.Router();

router
  .get('/login', function(req, res, next) {
    console.log(req.session);
    res.render('login');
  })
  .post('/login', function(req, res, next) {
    const { email, password } = req.body;
    
    if (email === 'pesho@gmail.com' && password === 'pesho123') {
      req.session.user = { email };
      res.send('You made it champ');
    } else {
      res.status(401).send();
    }
  })
  .get('/profile', (req, res) => {
    console.log(req.session.user);
    const { user } = req.session;

    if (user) {
      res.render('profile');
    } else {
      res.redirect('/users/login');
    }

    res.send('Hey from profile');
  });

module.exports = router;
