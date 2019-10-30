const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const reactionsController = require('../controllers/reactionsController');

router
  .post('/', isAuth, reactionsController.touch)
  .get('/getReactionsByResourceId', isAuth, reactionsController.getReactionsByResourceId);

module.exports = router;