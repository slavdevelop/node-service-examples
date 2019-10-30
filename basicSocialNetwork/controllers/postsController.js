const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
    createPost: async (req, res, next) => {
        const { title, content, userId } = req.body;

        try {
            const post = await Post.create({ title, content, userId });
            post.save();

            const user = await User.findOneAndUpdate({ _id: userId }, { $push: { posts: post._id } })
            user.save();

            res.status(201)
                .json({ message: 'Post created!', post });
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            next(err);
        }
    },

    getPosts: (req, res, next) => {
        Post.find()
            .then((posts) => {
                res.status(200)
                    .json({ message: 'Posts fetched!', posts});
            })
            .catch((err) => {
                if (!err.status) {
                    err.status = 500;
                }

                next(err);
            })

        
    },

    getPostByPostId: (req, res, next) => {

        const postId = req.body.postId;

        Post.findOne({ _id: postId })
            .then((post) => {
                res.status(200)
                    .json({ message: 'Post fetched!', post });
            })
            .catch((err) => {
                if (!err.status) {
                    err.status = 500;
                }

                next(err);
            })
    },

    editPostById: async (req, res, next) => {

        const { postId, title, content } = req.body;

        try {
            const post = await Post.findOne({ _id: postId });
        
            if (title !== post.title) {
                post.title = title;
            }

            if (content !== post.content) {
                post.content = content;
            }

            post.save();

            res.status(200)
                .json({ message: 'Post edited!', post });
        } catch (err) {

            if (!err.status) {
                err.status = 500;
            }

            next(err);
        }
    },

    deletePostById: async (req, res, next) => {

        const { postId, userId } = req.body;

        try {
            
            const commentIds = [];
            
            const comments = await Comment.find({ postId: postId });
            comments.forEach((cm) => commentIds.push(cm._id.toString()));

            await Comment.deleteMany({ postId: postId });

            
            const user = await User.findOne({ _id: userId });
            user.posts.pull(postId);
            user.comments.pull(...commentIds);
            user.save();
            
            await Post.findOneAndDelete({ _id: postId });

            res.status(200)
                .json({ message: 'Deleted successfully' });

        } catch (err) {
            
            if (!err.status) {
                err.status = 500;
            }

            next(err);
        }
    }
}