const Post = require('../models/post');
const User = require('../models/user');

function validatePost(req, res) {

}

module.exports = {
    getPosts: (req, res) => {
        Post.find()
            .then((posts) => {
                res.status(200)
                    .json({
                        message: 'Posts feched',
                        posts
                    })
            })
            .catch((err) => {
                res.status(500)
                    .json({ message: 'Internal Server Error' });

                console.log(err);
            });
    },
    createPost: (req, res) => {
        const { title, content, creator } = req.body;

        const post = new Post({ title, content, creator });
        post.save()
            .then((p) => {
                res.status(201)
                    .json({
                        message: ''
                    })
            })
    },
    deletePostById: (req, res) => {
        res.status(200)
            .json({ message: 'Simple' });
    },
    getPostById: (req, res) => {
        res.status(200)
            .json({ message: 'Simple' });
    },
    updatePostById: (req, res) => {
        res.status(200)
            .json({ message: 'Simple' });
    }
}