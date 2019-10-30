const User = require('../models/user');
const encryption = require('../utils/encryption');

function validateUser(req, res) {
    return true;
}

module.exporst = {
    signUp: (req, res) => {

        res.write('asd');
        res.end();


        // if (validateUser(req, res)) {
        //     const { email, password } = req.body;
        //     const salt = encryption.generateSalt();
        //     const hashedPassword = encryption.generateHashedPassword(salt, password);
            
        //     User.create({ email, hashedPassword, salt })
        //         .then((user) => {
        //             res.status(201)
        //                 .json({ message: 'User created!', userId: user._id });
        //         })
        //         .catch((err) => {
        //             res.status(500)
        //                 .json({ message: 'Internal server error!', error: err });
        //         })
        // }
    },
    // signIn: (req, res) => {
    //     res.status(200)
    //         .json({ message: 'asd' });
    // }
};