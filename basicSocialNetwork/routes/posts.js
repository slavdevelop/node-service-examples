const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const postsController = require('../controllers/postsController');

router
  .post('/', isAuth, postsController.createPost)
  .get('/all', isAuth, postsController.getPosts)
  .get('/', isAuth, postsController.getPostByPostId)
  .put('/', isAuth, postsController.editPostById)
  .delete('/', isAuth, postsController.deletePostById);

module.exports = router;