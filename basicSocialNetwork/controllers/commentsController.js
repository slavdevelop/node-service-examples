const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
    createComment: async (req, res, next) => {
        const { content, userId, postId } = req.body;

        try {
            const comment = await Comment.create({ content, userId, postId });
            comment.save();

            const user = await User.findOneAndUpdate({ _id: userId }, { $push: { comments: comment._id } });
            user.save();

            const post = await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: comment._id } });
            post.save();

            res.status(201)
                .json({ message: 'Comment created!', comment });
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            next(err);
        }
    },

    getCommentById: (req, res, next) => {
        Post.find()
            .then((posts) => {
                res.status(200)
                    .json({ message: 'Comment fetched!', posts});
            })
            .catch((err) => {
                if (!err.status) {
                    err.status = 500;
                }

                next(err);
            })

        
    },

    getCommentsByPostId: (req, res, next) => {
        const postId = req.body.postId;

        Post.findOne({ _id: postId })
            .then((post) => {
                res.status(200)
                    .json({ message: 'Comments for postId fetched!', post });
            })
            .catch((err) => {
                if (!err.status) {
                    err.status = 500;
                }

                next(err);
            })
    },

    editCommentById: (req, res) => {
        res.status(200)
            .json({ message: 'Comment edited!' });
    },

    deleteCommentById: (req, res) => {
        res.status(200)
            .json({ message: 'Comment deleted!' });
    }
}