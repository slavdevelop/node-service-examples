const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

router
  .post('/register', usersController.register)
  .post('/login', usersController.login)
  .post('/logout', isAuth, usersController.logout)
  .get('/posts', isAuth, usersController.getPosts);

module.exports = router;