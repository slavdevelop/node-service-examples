const router = require('express').Router();
const feedController = require('../controllers/feedController');

router.get('/posts', feedController.getPosts);
router.post('/post/create', feedController.createPost);
router.delete('/post/delete/:postId', feedController.deletePostById);
router.get('/post/:postId', feedController.getPostById);
router.put('/post/update/:postId', feedController.updatePostById);

module.exports = router;