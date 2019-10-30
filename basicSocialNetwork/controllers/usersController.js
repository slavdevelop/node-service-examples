const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');

const UserService = require('../services/userService');

function validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        message: 'Validation failed, entered data is incorrect',
        errors: errors.array()
      });
      
      return false;
    }
  
    return true;
}

module.exports = {
    register: (req, res, next) => {
        if (validateUser(req, res)) {
            const { email, password } = req.body;

            UserService.createUser({ email, password })
                .then((user) => {
                    res.status(201)
                        .json({ message: 'User created!', userId: user._id });
                })
                .catch((err) => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }

                    next(err);
                })

        }
    },

    login: (req, res, next) => {
        const { email, password } = req.body;

        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    const error = new Error('A user with this email could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                if (!user.authenticate(password)) {
                    const error = new Error('A user with this email could not be found');
                    error.statusCode = 401;
                    throw error;
                }

                const token = jwt.sign({
                    email: user.email,
                    userId: user._id.toString()
                },
                'ggmu',
                { expiresIn: '1h' });

                res.status(200)
                    .json({
                        message: 'User successfully logged in!',
                        token,
                        userId: user._id.toString(),
                        email: email
                    });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }

                next(err);
            })
    },

    logout: (req, res, next) => {
        res.status(200)
            .json({ message: 'Logout', token: null });
    },

    getPosts: (req, res, next) => {
        Post.find({ userId: req.body.userId })
            .then((posts) => {
                res.status(200)
                    .json({ message: `All posts created by ${req.body.email}`, posts });
            })
            .catch((err) => {
                if (!err.status) {
                    err.status = 500;
                }

                next(err);
            })
    }
}