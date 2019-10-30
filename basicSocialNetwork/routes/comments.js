const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const commentsController = require('../controllers/commentsController');

router
  .post('/', isAuth, commentsController.createComment)
  .get('/', isAuth, commentsController.getCommentById)
  .get('/:postId', isAuth, commentsController.getCommentsByPostId)
  .put('/:commentId', isAuth, commentsController.editCommentById)
  .delete('/:commentId', isAuth, commentsController.deleteCommentById);

module.exports = router;