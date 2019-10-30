const express = require('express');
const UsersController = require('../controllers/usersController');

const usersController = new UsersController();
const router = express.Router();

router
  .get('/', usersController.getUsers)
  .get('/profile', usersController.getProfile)
  .get('/register', usersController.getRegister)
  .post('/register', usersController.postRegister);

module.exports = router;