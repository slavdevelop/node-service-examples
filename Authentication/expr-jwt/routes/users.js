var express = require('express');
var User = require('../data/models/user-model');
var router = express.Router();

/* GET users listing. */
router
  .get('/profile', function(req, res) {
    const token = req.header('x-auth');

    if (!token.length) {
      res.redirect('login');
    }

    User.findByToken(token)
      .then((user) => {
        debugger;
        res.render('profile', user);
      })
      .catch(err => res.status(400).send());

    if (!token) {
      res.redirect('/users/login');
    } else {
      res.send('Super batko');
    }
    
  })
  .get('/login', function(req, res, next) {
    res.render('login');
  })
  .get('/register', function(req, res, next) {
    res.render('register');
  })
  .post('/register', (req, res) => {
    const { email, password } = req.body;

    if (email.length && password.length) {
      const user = new User({ email, password });
      
      user.save()
        .then(() => {
          user.generateAuthToken()
            .then((token) => {
              res.header('x-auth', token).redirect('/users/profile');
            })
            .catch((err) => res.status(400).send(err))
        })
        .catch((err) => res.status(400).send(err));
    } else {

    }
  });

module.exports = router;
