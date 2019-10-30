const User = require('../models/user');
const encryption = require('../utils/encryption');

module.exports = {
    createUser: async (user) => {
        const { email, password } = user;

        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, password);

        try {
            const result = await User.create({ email, hashedPassword, salt })
            .then((user) => {
                return user;
            })
            .catch((err) => err);

            return result;
        } catch (err) {
            throw err;
        }
    },

    // getUserByEmail: (email) => {
    //     User.findOne({ email: email })
    //         .then(user)
    //         .catch(err);
    // }

    // login: (req, res, next) => {
    //     const { email, password } = req.body;

    //     User.findOne({ email: email })
    //         .then((user) => {
    //             if (!user) {
    //                 const error = new Error('A user with this email could not be found');
    //                 error.statusCode = 401;
    //                 throw error;
    //             }

    //             if (!user.authenticate(password)) {
    //                 const error = new Error('A user with this email could not be found');
    //                 error.statusCode = 401;
    //                 throw error;
    //             }

    //             const token = jwt.sign({
    //                 email: user.email,
    //                 userId: user._id.toString()
    //             },
    //             'ggmu',
    //             { expiresIn: '1h' });

    //             res.status(200)
    //                 .json({
    //                     message: 'User successfully logged in!',
    //                     token,
    //                     userId: user._id.toString(),
    //                     email: email
    //                 });
    //         })
    //         .catch((err) => {
    //             if (!err.statusCode) {
    //                 err.statusCode = 500;
    //             }

    //             next(err);
    //         })
    // }
}